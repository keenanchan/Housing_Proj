from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash
from flask_cors import CORS,cross_origin
from flask_socketio import SocketIO
from PIL import Image
from flask import make_response
import csv
import json
import io
import requests
import httplib2
from sqlalchemy import create_engine,asc
from sqlalchemy.orm import sessionmaker
from database_setup import Others,Picture,User, Room, Base
from util import intro_processing,header_processing,other_processing,img_processing
import os, os.path



application = Flask(__name__)
socketio = SocketIO(application)
#app.config['CORS_HEADERS'] = 'Content-Type'

# print a nice greeting.
def say_hello(username = "World"):
    return '<p>Hello %s!</p>\n' % username

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@application.route('/')
@application.route('/index')
def sessions():
    return render_template('session.html')

@socketio.on('my event')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    print('received my event: ' + str(json))
    json["confirmed"] = "backend"
    socketio.emit('my response', json, callback=messageReceived)

# some bits of text for the page.
header_text = '''
    <html>\n<head> <title>EB Flask Test</title> </head>\n<body>'''
instructions = '''
    <p><em>Hint</em>: This is a wtf web service! Append a username
    to the URL (for example: <code>/Thelonious</code>) to say hello to
    someone specific.</p>\n'''
home_link = '<p><a href="/">Back</a></p>\n'
footer_text = '</body>\n</html>'



# EB looks for an 'application' callable by default.
#application = Flask(__name__)

# add a rule for the index page.
#application.add_url_rule('/', 'index', (lambda: header_text +
#    say_hello() + instructions + footer_text))

# add a rule when the page is accessed with a name appended to the site
# URL.
#application.add_url_rule('/<username>', 'hello', (lambda username:
#    header_text + say_hello(username) + home_link + footer_text))

# run the app.
if __name__ == "__main__":
    # Setting debug to True enables debug output. This line should be
    # removed before deploying a production app.
    application.debug = True
    application.run()