import os
from datetime import datetime
from db.database_setup import Base, User
import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response, Response
from flask import session as login_session
from flask_cors import CORS
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
from app.bluePrints.auth import authetication
from app.util.search import search
from app.db.database_setup import Bookmark, Room
from flask_sqlalchemy import SQLAlchemy
from app.util.util import generateResponse
import json
from db.crud import room_json, read_rooms, write_room, add_bookmark, \
    remove_bookmark, update_field

from app.util.spotify import search_songs

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///db/housing.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.register_blueprint(authetication)
app.config['CORS_HEADERS'] = 'Content-Type'
session = db.create_scoped_session()
app.config['DB_CONNECTION'] = session
CORS(app, supports_credentials=True)


@ app.route('/profile', methods=['POST', 'OPTIONS'])
def editProfile():
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    update_field(
        User, session, {'email': requested_json['email']},
        requested_json['updates']
    )
    message, status = 'Successfully edited profile.', 201
    print(message)
    return generateResponse(elem=message, status=status)


@ app.route('/getRoom', methods=['GET'])
def showRooms():
    rooms_db = read_rooms(session)
    rooms_db.sort(key=lambda elem: elem.date_created, reverse=True)
    rooms = [room_json(room, session) for room in rooms_db]
    return generateResponse(elem=rooms)


@ app.route('/postRoom', methods=['POST', 'OPTIONS'])
def postRooms():
    # TODO check if logged in
    if request.method == 'OPTIONS':
        return generateResponse()
    photo = request.files.getlist("photos")
    requested_json = json.loads(request.form["json"])
    requested_json["photos"] = photo
    success = write_room(requested_json, session)
    message, status = 'Successfully created room.', 201
    if not success:
        message, status = 'Internal Database Failure.\
                    We are working our ass off to fix it', 500
    return generateResponse(elem=message, status=status)


@ app.route('/searchRoom', methods=['POST', 'OPTIONS'])
def searchRooms():
    if request.method == 'OPTIONS':
        return generateResponse()
    return generateResponse(elem=search(request.json, session))


@ app.route('/bookmark', methods=['POST', 'OPTIONS', 'GET'])
def bookmark():
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    client_token = request.cookies.get("access_token")
    if not client_token or (client_token != login_session["access_token"]):
        # if user is not logged in
        print(client_token, login_session["access_token"])
        return generateResponse(elem="Bookmark get/add/remove is forbidden due to invalid token", status=403)
    if request.method == 'GET':
        bookmark_rooms = [room_json(bookmark.room, session) for bookmark in session.query(
            Bookmark).filter_by(user_id=login_session["user_id"]).all()]
        return generateResponse(elem=bookmark_rooms)
    message, status = 'Successfully added bookmark.', 201
    if requested_json['action'] == 'add':
        add_bookmark(requested_json['room_id'],
                     login_session["user_id"], session)
    else:
        remove_bookmark(
            requested_json['room_id'], login_session["user_id"], session)
        message, status = 'Successfully deleted bookmark.', 200
    return generateResponse(elem=message, status=status)

@ app.route('/spotify', methods=['GET'])
def spotify():
    result = search_songs('chopin')
    json_response = {'items': []}
    if result:
        json_response['items'] = result
    return generateResponse(json_response)

@ app.route('/spotify_search', methods=['POST', 'OPTIONS'])
def spotify_search():
    if request.method == 'OPTIONS':
        return generateResponse()
    requested_json = request.json
    result = search_songs(requested_json['query'])
    json_response = {'items': []}
    if result:
        json_response['items'] = result
    return generateResponse(json_response)

if __name__ == '__main__':
    app.secret_key = b'\xb7\xe2\xd6\xa3\xe2\xe0\x11\xd1\x92\xf1\x92G&>\xa2:'
    app.debug = True
    app.run(host='0.0.0.0', port=3002)
