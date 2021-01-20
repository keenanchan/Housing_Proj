import os, os.path
from PIL import Image

def intro_processing(json_f):
    parking = "parking spot" if json_f["parking"] == "yes" else "no parking"
    bathroom = "shared bathroom" if json_f["bathroom"] == "yes" else "private bathroom"
    pets = "pets allowed" if json_f["pets"] == "yes" else "pets not allowed"
    return ", ".join([bathroom,pets,bathroom])
def header_processing(json_f):
    checker = {
        "master": "Master",
        "guest": "Guest",
        "single": "Single",
        "double": "Double",
        "triple": "Triple",
        "living_room": "Living Room",
        "den": "Den",
        "studio": "Studio",
        "suite": "Suite"
    }
    types = [elem for elem in checker if json_f[elem] == "yes" ]
    end_str = "/".join([checker[elem] for elem in types])
    name = json_f["address"][:json_f["address"].find(",")] +\
            "- " + json_f.get("bedroom") + json_f.get("bathroom") +\
            "- " + end_str
    return name
def rtype_processing(json_f):
    checker = {
        "master": "Master",
        "guest": "Guest",
        "single": "Single",
        "double": "Double",
        "triple": "Triple",
        "living_room": "Living Room",
        "den": "Den",
        "studio": "Studio",
        "suite": "Suite"
    }
    types = [elem for elem in checker if json_f[elem] == "yes" ]
    return "/".join(types)
def other_processing(json_f):
        checkers = ["washer","patio","fridge","microwave","oven","ac","pool","SPA","gym","elevator","private","hardwood",\
        "gender","living","pets","parking","furnished","negotiable","utility"]
        others = [elem for elem in checkers if json_f[elem] == "yes" ]
        return others
def img_processing(photos):
        # this file needs overhaul
        main = None
        pics = []
        for photo in photos:
                print(photo)
                name = photo.filename
                cnt = len(os.listdir('../FrontEnd/app/data'))
                image = Image.open(photo)
                t_save_name = "../FrontEnd/app/data/{cnt}.{form}".format(cnt=cnt,form=name[name.find(".")+1:])
                image.save(t_save_name) 
                pic_send_name = "./app/data/{cnt}.{form}".format(cnt=cnt,form=name[name.find(".")+1:])
                if main: pics.append(pic_send_name)
                main = main if main else pic_send_name
        return main,pics
