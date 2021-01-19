from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response
from flask import session as login_session
from flask_cors import CORS,cross_origin
from flask_socketio import SocketIO
from PIL import Image
from flask import make_response
import csv
import json
import io
import random
import string
import requests
import httplib2
from sqlalchemy import create_engine,asc
from sqlalchemy.orm import sessionmaker
from database_setup import PicturePerson, Tenant, OthersT, Others,PictureRoom,User, Room, Base
from util import intro_processing,header_processing,other_processing,img_processing,rtype_processing
import os, os.path
from authetification import authetification, getUserID, getUserInfo



app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
app.config['CORS_HEADERS'] = 'Content-Type'
app.register_blueprint(authetification)
engine = create_engine('sqlite:///housing.db?check_same_thread=False')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/result', methods=['POST'])
@cross_origin()
def newRoom():
	photos = request.files.getlist("photos")
	requested_json = json.loads(request.form["json"])
	name = header_processing(requested_json)
	main_pic, pics = img_processing(photos)
	price_range = "$" + str(requested_json["price_range"][0]) + "-" + str(requested_json["price_range"][1])
	intro = intro_processing(requested_json)
	move_time = requested_json["move_time1"]  + " " + requested_json["move_time2"] 
	stay_period = requested_json["stay_period"]
	others = other_processing(requested_json)
	# create a room
	room = Room(user_id=1,intro=intro,\
    price_range=price_range, stay_period=stay_period, move_time=move_time,\
    name=name, lat=requested_json["latlng"]["lat"],lng=requested_json["latlng"]["lng"])
	session.add(room)
	session.commit()
	# load pictures in db
	main_p = PictureRoom(picture=main_pic,type_n="main_room",room=room,user_id=1)
	session.add(main_p)
	session.commit()
	for p in pics:
		temp_p = PictureRoom(picture=p,type_n="room",room=room,user_id=1)
		session.add(temp_p)
		session.commit()
	# load other icons in db
	for o in others:
		other = Others(name=o,room=room)
		session.add(other)
		session.commit()
	session.refresh(room)
	print(name,room.id)
	return "success"

@app.route('/getRoom', methods=['GET'])
@cross_origin()
def showRoom():
	rooms = session.query(Room).all()
	response = []
	for room in rooms:
		t_main = session.query(PictureRoom).filter_by(room_id=room.id,type_n="main_room").one().picture
		t_serial = room.serialize
		t_serial["main_pic"] = t_main
		response.append(t_serial)
	return jsonify(response)

@app.route('/getSingle', methods=['POST'])
@cross_origin()
def getRoom():
	print(request.json)
	room_id = json.loads(request.json["house_id"])
	room = session.query(Room).filter_by(id=room_id).one()
	response = room.serialize
	pics_q = session.query(PictureRoom.picture).filter_by(room_id=room_id).all()
	others_q = session.query(Others.name).filter_by(room_id=room_id).all()
	pics = [elem[0] for elem in pics_q]
	others = [elem[0] for elem in others_q]
	print(pics,others)
	response["pics"] = pics
	response["others"] = others
	return jsonify(response)


@app.route('/getPeople', methods=['GET'])
@cross_origin()
def showPpl():
	tenants = session.query(Tenant).all()
	response = []
	for t in tenants:
		t_main = session.query(PicturePerson).filter_by(tenant_id=t.id).one().picture
		email = session.query(User).filter_by(tenant_id=t.id).one().email
		others_t = session.query(OthersT.name).filter_by(tenant_id=t.id).all()
		t_serial = t.serialize
		t_serial["email"] = email[:email.find("@")]
		t_serial["main_pic"] = t_main
		t_serial["others"] = others_t
		response.append(t_serial)
	return jsonify(response)


@app.route('/')
def sessions():
    return render_template('session.html')


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')


@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
	print('received my event: ' + str(json))
	socketio.sleep(0)
	socketio.emit('my response', json, callback=messageReceived)

if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='localhost', port=3001)
