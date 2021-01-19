from flask import current_app, Blueprint, request, \
    jsonify, session as login_session, Response, url_for, redirect
import oauth2 as oauth
from app.db.crud import check_exist, add_user
from app.db.database_setup import User
from datetime import datetime
from app.util.util import generateResponse
from app.util.aws.s3 import upload_file_wname
from app.util.twitter import getFriends
import os
import random
import string
import urllib.request
import urllib.parse
import urllib.error
import urllib
import json


authetication = Blueprint('auth', __name__)
request_token_url = 'https://api.twitter.com/oauth/request_token'
access_token_url = 'https://api.twitter.com/oauth/access_token'
authorize_url = 'https://api.twitter.com/oauth/authorize'
show_user_url = 'https://api.twitter.com/1.1/users/show.json'

oauth_store = {}
twitter_store = {}


@authetication.route("/login", methods=['POST', 'OPTIONS'])
def login():
    """Create anti-forgery state token."""
    if request.method == 'OPTIONS':
        return generateResponse()
    access_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                           for x in range(32))
    login_session["access_token"] = access_token
    requested_json = request.json
    # check in with db to see if user is new
    session = current_app.config['DB_CONNECTION']
    user = check_exist(User, session, **{'email': requested_json['email']})
    if not user:
        # User doesn't exist
        # maybe also do: , 'access_token': access_token
        json_response = {'newUser': True}
        response = generateResponse(json_response)
        response.set_cookie('access_token', access_token)
        return response
    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])
    login_session["user_id"] = user.id
    json_response = {'name': requested_json['name'],
                     'email': requested_json['email'],
                     'access_token': access_token,
                     'message': 'Successfully created room.',
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major,
                     'profile_photo': path_name
                     }
    response = generateResponse(json_response)
    response.set_cookie('access_token', access_token)
    return response


@authetication.route("/logout", methods=['POST', 'OPTIONS'])
def logout():
    if request.method == 'OPTIONS':
        return generateResponse()
    client_token = request.json.get('access_token')
    message, status = 'Successful Logout!', 200
    # delete the user id
    if not client_token or (client_token != login_session["access_token"]):
        message, status = 'Logout is Forbidden due to wrong token', 403
        print(client_token, login_session["access_token"])
    else:
        del login_session["user_id"]
    return generateResponse(elem=message, status=status)


@authetication.route("/createUser", methods=["POST", "OPTIONS"])
def create_user():
    session = current_app.config['DB_CONNECTION']
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    if check_exist(User, session, **{'email': requested_json['email']}):
        message, status = 'Already Created', 200
        return generateResponse(elem=message, status=status)

    user = add_user(requested_json['name'],
                    requested_json['email'],
                    datetime.now(),
                    requested_json['phone'],
                    requested_json["description"],
                    requested_json["schoolYear"],
                    requested_json["major"],
                    session)
    login_session["user_id"] = user.id
    icon_path = './assets/profile_default_icons/'
    selected_icon = random.choice(
        os.listdir(icon_path))
    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])
    upload_file_wname(icon_path+selected_icon, 'houseit', path_name)

    json_response = {'name': requested_json['name'],
                     'email': requested_json['email'],
                     'access_token': login_session["access_token"],
                     'message': 'Successfully created room.',
                     'description': user.description,
                     'phone': user.phone,
                     'schoolYear': user.school_year,
                     'major': user.major,
                     'profile_photo': path_name
                     }
    response = generateResponse(json_response, 201)
    response.set_cookie('access_token', login_session["access_token"])

    return response


@authetication.route("/twitter_start", methods=["GET"])
def twitter_start():
    app_callback_url = url_for('auth.twitter_callback', _external=True)
    print(app_callback_url)
    # Generate the OAuth request tokens, then display them
    consumer = oauth.Consumer(
        current_app.config['APP_CONSUMER_KEY'], current_app.config['APP_CONSUMER_SECRET'])
    client = oauth.Client(consumer)
    resp, content = client.request(request_token_url, "POST",
                                   body=urllib.parse.urlencode({
                                       "oauth_callback": app_callback_url}))
    print(current_app.config['APP_CONSUMER_KEY'],
          current_app.config['APP_CONSUMER_SECRET'])
    if resp['status'] != '200':
        error_message = 'Invalid response, status {status}, {message}'.format(
            status=resp['status'], message=content.decode('utf-8'))
        return generateResponse(elem=error_message, status=resp['status'])
    request_token = dict(urllib.parse.parse_qsl(content))
    oauth_token = request_token[b'oauth_token'].decode('utf-8')
    oauth_token_secret = request_token[b'oauth_token_secret'].decode('utf-8')
    oauth_store[oauth_token] = oauth_token_secret
    json_response = {
        "authorize_url": authorize_url+"?oauth_token="+oauth_token,
    }
    response = generateResponse(json_response)
    return response


@authetication.route("/twitter_callback", methods=["GET"])
def twitter_callback():
    # Accept the callback params, get the token and call the API to
    # display the logged-in user's name and handle
    oauth_token = request.args.get('oauth_token')
    oauth_verifier = request.args.get('oauth_verifier')
    oauth_denied = request.args.get('denied')

    # if the OAuth request was denied, delete our local token
    # and show an error message
    if oauth_denied:
        if oauth_denied in oauth_store:
            del oauth_store[oauth_denied]
        return generateResponse(elem="the OAuth request was denied by this user", status=403)

    if not oauth_token or not oauth_verifier:
        return generateResponse(elem="callback param(s) missing", status=404)

    # unless oauth_token is still stored locally, return error
    if oauth_token not in oauth_store:
        return generateResponse(elem="oauth_token not found locally", status=404)

    oauth_token_secret = oauth_store[oauth_token]

    # if we got this far, we have both callback params and we have
    # found this token locally

    consumer = oauth.Consumer(
        current_app.config['APP_CONSUMER_KEY'], current_app.config['APP_CONSUMER_SECRET'])
    token = oauth.Token(oauth_token, oauth_token_secret)
    token.set_verifier(oauth_verifier)
    client = oauth.Client(consumer, token)

    resp, content = client.request(access_token_url, "POST")
    access_token = dict(urllib.parse.parse_qsl(content))

    screen_name = access_token[b'screen_name'].decode('utf-8')
    user_id = access_token[b'user_id'].decode('utf-8')

    # These are the tokens you would store long term, someplace safe
    real_oauth_token = access_token[b'oauth_token'].decode('utf-8')
    real_oauth_token_secret = access_token[b'oauth_token_secret'].decode(
        'utf-8')

    # Call api.twitter.com/1.1/users/show.json?user_id={user_id}
    real_token = oauth.Token(real_oauth_token, real_oauth_token_secret)
    real_client = oauth.Client(consumer, real_token)
    real_resp, real_content = real_client.request(
        show_user_url + '?user_id=' + user_id, "GET")

    if real_resp['status'] != '200':
        error_message = "Invalid response from Twitter API GET users/show: {status}".format(
            status=real_resp['status'])
        return rgenerateResponse(elem=error_message, status=real_resp['status'])

    response = json.loads(real_content.decode('utf-8'))

    friends_count = response['friends_count']
    statuses_count = response['statuses_count']
    followers_count = response['followers_count']
    name = response['name']
    print(getFriends(real_oauth_token, real_oauth_token_secret))
    twitter_store["friends"] = getFriends(
        real_oauth_token, real_oauth_token_secret)
    # don't keep this token and secret in memory any longer
    del oauth_store[oauth_token]
    return redirect("http://localhost:3000/twitter_stats")


@authetication.route("/twitter_stats", methods=["GET"])
def twitter_stats():
    json_response = {"friends": []}
    if "friends" in twitter_store:
        json_response["friends"] = twitter_store["friends"]
    print(json_response, "what")
    response = generateResponse(json_response)
    return response
