from flask import Blueprint, flash, make_response, request, redirect,jsonify
from flask import render_template, url_for
from flask import session as login_session
from sqlalchemy import create_engine,asc
from sqlalchemy.orm import sessionmaker
from database_setup import PictureRoom, Tenant, OthersT, Others,PicturePerson,User, Room, Base
from stream_chat import StreamChat
import httplib2
import json
import requests
import random
import string
from util import intro_processing,header_processing,other_processing,img_processing,rtype_processing

engine = create_engine('sqlite:///housing.db?check_same_thread=False')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()
authetification = Blueprint('auth', __name__)

# initialize chat API
client = StreamChat(api_key="tqnbvvgngey3", api_secret="4q22sqqsqgauudergg4vqdxqbrrdk96qppp3223fh8eb4na2vzb2gbb99589qzf5")
client.update_user({"id": "system", "name": "The Server"})
user_token = client.create_token('system')
#cs = client.query_channels({"type": 'messaging',"members": { "$in": ["yizong"] } },{ "last_message_at": -1 })
#print(cs)
print(user_token)
#t_id = '!members-WC2hY0GhjANpKNMZgANMWmSxf5Ahh_5mU6XFxZxlfq0'
#print(client.channel("messaging", t_id).delete())
channel = client.channel("messaging", "kung-fu")
channel.create("system")
channel.add_members(["system"])
response = channel.send_message({"text": "AMA about kung-fu"}, 'system')

@authetification.route("/getstate",methods=['GET'])
def generate_state():
    """Create anti-forgery state token."""
    state_token = "".join(random.choice(string.ascii_uppercase + string.digits)
                    for x in range(32))
    login_session["state"] = state_token
    print(login_session)
    js = json.dumps(state_token)
    response = make_response(js, 200)
    response.headers['Content-Type'] = 'application/json'        
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    return response

@authetification.route("/gdisconnect", methods=['POST','OPTIONS'])
def gdisconnect():
    if request.method == 'OPTIONS':
        resp = make_response()
        resp.headers['Access-Control-Allow-Headers'] = "Content-Type"
        resp.headers['Access-Control-Allow-Credentials'] = 'true'
        print(resp)
        #print(login_session)
        return resp
    url = 'https://accounts.google.com/o/oauth2/revoke?token=%s' \
        % login_session['accessToken']
    h = httplib2.Http()
    result = h.request(url, 'GET')[0]
    print(result)
    print("logout success")
    # When valid status, make response
    if result['status'] == '200':
        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        response.set_cookie('userid', '', expires=0)
        response.set_cookie('profile_pic', '', expires=0)
        del login_session['accessToken']
        del login_session['username']
        del login_session['email']
        del login_session['profile_pic']
        return response
    else:
        response = make_response(json.dumps('Failed to revoke token for given user.'), 400)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    




@authetification.route("/gconnect", methods=['POST','OPTIONS'])
def gconnect():
    # Validate state token
    print(login_session)
    if request.method == 'OPTIONS':
        resp = make_response()
        resp.headers['Access-Control-Allow-Headers'] = "Content-Type"
        resp.headers['Access-Control-Allow-Credentials'] = 'true'
        print(resp)
        #print(login_session)
        return resp
    if request.json['state_token'] != login_session["state"]:
        response = make_response(json.dumps('Invalid state parameter.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response
    data = request.json['profileObj']
    login_session['username'] = data["name"]
    login_session['email'] = data["email"]
    login_session['profile_pic'] = data["imageUrl"]
    print(request.json["accessToken"])
    login_session['accessToken'] = request.json['accessToken']
    userid = getUserID(login_session['email'])
    if userid:
        img = getUserPic(userid)
    else:
        img = login_session['profile_pic']
        createUser(login_session)
    uid = login_session['email'][:login_session['email'].find("@")]
    streamchat_token = client.create_token(uid)
    response = make_response(jsonify([img,uid,streamchat_token]), 200)
    response.headers['Content-Type'] = 'application/json'  
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.set_cookie('userid', uid)
    response.set_cookie('token', streamchat_token)
    response.set_cookie('profile_pic', login_session['profile_pic'])
    print("connected success",response)
    return response

def getUserID(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except:
        return None

def createUser(login_session):
    # Add user
    uid = login_session['email'][:login_session['email'].find("@")]
    client.update_user({"id": uid, "name": login_session['username']})
    print("user created %s"%uid)
    newUser = User(name=login_session['username'], email=login_session['email'])
    # Create chat client
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    newPic = PicturePerson(picture=login_session['profile_pic'],type_n="profile_pic",user_id=user.id)
    session.add(newPic)
    session.commit()
    return user.id


def getUserInfo(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    return user

def getUserPic(user_id):
    return session.query(PicturePerson).filter_by(user_id=user_id,type_n="profile_pic").one().picture

@authetification.route("/addtenant", methods=['POST','OPTIONS'])
def newPerson():
    if request.method == 'OPTIONS':
        resp = make_response()
        resp.headers['Access-Control-Allow-Headers'] = "Content-Type"
        resp.headers['Access-Control-Allow-Credentials'] = 'true'
        print(resp)
        #print(login_session)
        return resp
    photos = request.files.getlist("photos")
    requested_json = json.loads(request.form["json"])
    name = header_processing(requested_json)
    main_pic, pics = img_processing(photos)
    price_range = "$" + str(requested_json["price_range"][0]) + "-" + str(requested_json["price_range"][1])
    intro = intro_processing(requested_json)
    move_time = requested_json["move_time1"]  + " " + requested_json["move_time2"] 
    stay_period = requested_json["stay_period"]
    others = other_processing(requested_json)
    user_id = getUserID(login_session["email"])
    r_type = rtype_processing(requested_json)
    print(user_id,"debugging people section")



    # CHECK USER WHETHER ALREADY IS A TENANT
    print(user_id)
    if user_id and not getUserInfo(user_id).tenant_id:
        user = getUserInfo(user_id)
        pic = session.query(PicturePerson).filter_by(user_id=user_id,type_n="profile_pic").one()
        # create a Tenant
        tenant = Tenant(user=user,intro=intro,\
        price_range=price_range, stay_period=stay_period, move_time=move_time,r_type=r_type)
        pic.tenant = tenant
        session.add(tenant)
        session.commit()
        # load other icons in db
        for o in others:
            other = OthersT(name=o,tenant=tenant)
            session.add(other)
            session.commit()
        session.refresh(tenant)
        print("success")
        response = make_response(json.dumps('Successfully created.'), 200)
        response.headers['Content-Type'] = 'application/json'
        response.headers['Access-Control-Allow-Headers'] = "Content-Type"
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response
    response = make_response(json.dumps('No need to Add'), 200)
    response.headers['Content-Type'] = 'application/json'
    response.headers['Access-Control-Allow-Headers'] = "Content-Type"
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response