import random
from flask import Flask, render_template, request, redirect,\
    jsonify, url_for, flash, make_response
from flask import session as login_session
from flask_cors import CORS, cross_origin
from app.assets.options import others, facilities
from app.util.aws.s3 import get_images
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)


# randomly generate options
def generateOptions(arr):
    num_sample = random.randint(0, len(arr))
    return random.sample(arr, num_sample)


# mimicking database
fakeRooms = [
    {
        'name': "Costa Verde Village",
        'id': 1,
        'location': "Costa Verde Village, Costa Verde Boulevard, San Diego, CA, USA",
        'distance': "16 mins",
        'pricePerMonth': 1000,
        'stayPeriod': 2,
        'early': "Anytime September",
        'late': "Late September",
        'roomType': "Single",
        'other': generateOptions(others),
        'facilities': generateOptions(facilities),
        'leaserName': "cris",
        'leaserEmail': "hehehehe@ucsd.edu",
        'leaserPhone': "911",
        'leaserSchoolYear': 3,
        'leaserMajor': "Computer Science and Engineering",
        'leaserIntro': "Live with me. YOLO",
        'photo': get_images(user_name="cris", extra_path="Costa Verde Village"),
        'profilePhoto': "https://cdn130.picsart.com/283184513034211.png"
    },
    {
        'name': "Solazzo Apartment Homes",
        'id': 2,
        'location': "Solazzo Apartment Homes, Villa La Jolla Drive, La Jolla, CA, USA",
        'distance': "5 mins",
        'pricePerMonth': 2000,
        'stayPeriod': 10,
        'early': "Anytime Janurary",
        'late': "Late September",
        'roomType': "Single",
        'other': generateOptions(others),
        'facilities': generateOptions(facilities),
        'leaserName': "amit",
        'leaserEmail': "hehehehe@ucsd.edu",
        'leaserPhone': "911",
        'leaserSchoolYear': 3,
        'leaserMajor': "Computer Science and Engineering",
        'leaserIntro': "Live with me. YOLO",
        'photo': get_images(user_name="amit", extra_path="Solazzo Apartment Homes"),
        'profilePhoto': "https://cdn130.picsart.com/283184513034211.png"
    },
    {
        'name': "Regents Court",
        'id': 3,
        'location': "Regents Court, Regents Road, San Diego, CA, USA",
        'distance': "1 hour 5 mins",
        'pricePerMonth': 3000,
        'stayPeriod': 5,
        'early': "Anytime Janurary",
        'late': "Late March",
        'roomType': "Double",
        'other': generateOptions(others),
        'facilities': generateOptions(facilities),
        'leaserName': "keenan",
        'leaserEmail': "hehehehe@ucsd.edu",
        'leaserPhone': "911",
        'leaserSchoolYear': 3,
        'leaserMajor': "Computer Science and Engineering",
        'leaserIntro': "Live with me. YOLO",
        'photo': get_images(user_name="keenan", extra_path="Regents Court"),
        'profilePhoto': "https://cdn130.picsart.com/283184513034211.png"
    },
    {
        'name': "Towers At Costa Verde",
        'id': 4,
        'location': "Towers At Costa Verde, Costa Verde Boulevard, San Diego, CA, USA",
        'distance': "2 hours 5 mins",
        'pricePerMonth': 5000,
        'stayPeriod': 9,
        'early': "Anytime Janurary",
        'late': "Late October",
        'roomType': "Living",
        'other': generateOptions(others),
        'facilities': generateOptions(facilities),
        'leaserName': "adam",
        'leaserEmail': "hehehehe@ucsd.edu",
        'leaserPhone': "911",
        'leaserSchoolYear': 3,
        'leaserMajor': "Computer Science and Engineering",
        'leaserIntro': "Live with me. YOLO",
        'photo': get_images(user_name="adam", extra_path="Towers At Costa Verde"),
        'profilePhoto': "https://cdn130.picsart.com/283184513034211.png"
    }
]*3


@app.route('/fakeRoom', methods=['GET'])
@cross_origin()
def showRooms():
    return jsonify(fakeRooms)


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='localhost', port=4001)
