from database_setup import User, Room, Move_In, \
    House_Attribute, Attribute, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from app.util.aws.s3 import get_images, upload_file_wname
from app.assets.options import months, intervals, others, facilities as facs, school_years, room_types, addresses_generate
from crud import add_user, \
    add_room, add_move_in, add_house_attribute, add_attribute
import os
import random

engine = create_engine('sqlite:///housing.db')
# Bind the engine to the metadata of the Base class so that the
# declaratives can be accessed through a DBSession instance
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
# A DBSession() instance establishes all conversations with the database
# and represents a "staging zone" for all the objects loaded into the
# database session object. Any change made against the objects in the
# session won't be persisted into the database until you call
# session.commit(). If you're not happy about the changes, you can
# revert all of them back to the last commit by calling
# session.rollback()
session = DBSession()

# define constants
CRIS = "cris"
AMIT = "amit"
ADAM = "adam"
KEENAN = "keenan"

descriptions = {
    CRIS: "I recently graduated with my bachelor's and will be working/volunteering fulltime. I do not smoke and I am clean (might misplace things though but)! I am also very sociable and enjoy cooking and baking 🙂 Hobbies I have are playing the violin, drawing, and watching kdramas! Feel free to message me for further questions ",
    AMIT: "We are pretty chill and very neat and respectful people ",
    ADAM: "Studying Data Science and Mathematics at the University of California, San Diego. Well-versed in Python (SKLearn, Pandas, Dask, etc..), R and Excel.Looking for an internship from June 2021 to September 2021 in the field of Data Science/Analytics where I can combine my mathematical/statistical knowledge and programming abilities with my strong writing and communication skills. ",
    KEENAN: "Software engineer with an attention to detail and strong people skills. Seeking full-time Software Engineering positions. "
}

# Add mock users
cris = add_user(CRIS, "haha@ucsd.edu", datetime.now(), "858-911",
                descriptions[CRIS], 'Third',
                "Data Science", session)
amit = add_user(AMIT, "amit@ucsd.edu", datetime.now(), "858-911989",
                descriptions[AMIT],  'Third',
                "Data Science", session)
adam = add_user(ADAM, "adam@ucsd.edu", datetime.now(), "858-65386",
                descriptions[ADAM], 'Third',
                "Computer Science and Engineering",
                session)
keenan = add_user(KEENAN, "keenan@ucsd.edu", datetime.now(), "858-4675432",
                  descriptions[KEENAN],  'Grad',
                  "Computer Science and Engineering",
                  session)
sonia = add_user("sonia", "sonia@ucsd.edu", datetime.now(), "858-4675432",
                 descriptions[KEENAN],  'Grad',
                 "Computer Science and Engineering",
                 session)
ali = add_user("ali", "ali@ucsd.edu", datetime.now(), "858-4675432",
               descriptions[KEENAN],  'Grad',
               "Computer Science and Engineering",
               session)
users = [adam, cris, amit, keenan]
descriptions = [
    """
    I’m looking for a roommate for a double for the summer. 
    Inside the 2B2B suit, we have one more suitmate in the other room and the living room is open for common space. 
    I like basketball but for now, I stay home because of COVID as I’m very cautious about that. 
    I do play the guitar but only in the common area. And I always wear headphones when listening to music. 
    Please feel free to reach out and see if we are a good match!
    """,
    """
    I’m planning to temporarily move back to LA for spring and summer quarter and looking for people to sublease my room for 6 months while I’m gone. You’ll be sharing the apartment with two quiet, responsible UCSD male students. We’re all currently working from home and practice social distancing whenever we need to go out for essentials so we’re looking for someone who is also COVID-19 conscious. Message me if you’re interested or need more details. 
    """,
    """
    I’m looking for a roommate for a double at Costa Verde. You will be living with 2 other girls who are all sophomore and the same major as I am. We are really chill people, COVID conscious, sometimes we like to cook and watch Netflix in the common area. DM me if you’re interested and we can talk!
    """,
    """
    Hello! As I am traveling back to home, I want to sublease my whole apartment to someone who is clean and respectful. You can use everything in the room, just don’t break them. You can treat it as a single or a double, I’m okay with either as long as it’s clean at the end of the lease. A deposit of $1000 will be charged at the beginning and will return if everything in the room is intact. Message me if you’re interested!
    """
]
file_dir = '../assets/room_mock_images/'
for user in users:
    # create icons
    icon_path = '../assets/profile_default_icons/'
    selected_icon = random.choice(
        os.listdir(icon_path))
    path_name = "/".join(["user"+str(user.id),
                          'profile', "headshot.jpg"])
    upload_file_wname(icon_path+selected_icon, 'houseit', path_name)

attributes = []
facilities = []
looking_for = []
for attr in others:
    temp_attr = add_attribute(attr, 'other', session)
    attributes.append(temp_attr)
    looking_for.append(temp_attr)
for attr in facs:
    temp_attr = add_attribute(attr, 'facilities', session)
    attributes.append(temp_attr)
    facilities.append(temp_attr)


def generateMock(k=30):
    move_combos = [(random.choice(intervals), months[6],
                    random.choice(intervals), months[7]) for _ in range(k)]
    move_ins = [add_move_in(elem[0], elem[1], elem[2],
                            elem[3], session) for elem in move_combos]
    mock_room_types = [random.choice(room_types) for _ in range(k)]
    mock_prices = [random.randint(200, 1000) for _ in range(k)]
    houses = [random.choice(addresses_generate) for _ in range(k)]
    people = [users[i % len(users)] for i in range(k)]
    negotiables = [random.choice([True, False]) for _ in range(k)]
    mock_stay_periods = [random.choice(list(range(1, 13))) for _ in range(k)]
    mock_descriptions = [descriptions[i % len(descriptions)] for i in range(k)]
    mock_eta = [str(random.choice(list(range(1, 30)))) +
                " mins" for _ in range(k)]
    mock_baths = [random.choice(list(range(1, 4))) for _ in range(k)]
    mock_beds = [random.choice(list(range(1, 4))) for _ in range(k)]
    mock_attrs = [list(set(random.sample(attributes, 8))) for _ in range(k)]
    mock_rooms = []
    print(mock_room_types)
    for i in range(k):
        temp_room = add_room(datetime.now(), mock_room_types[i], mock_prices[i], negotiables[i], mock_descriptions[i], mock_stay_periods[i],
                             mock_eta[i],
                             houses[i],
                             people[i], move_ins[i], mock_beds[i], mock_baths[i], session)
        for temp_attr in mock_attrs[i]:
            add_house_attribute(temp_room, temp_attr, session)
        mock_rooms.append(temp_room)
    for i in range(k):
        path_name = "/".join(["user"+str(people[i].id), 'housing',
                              str(mock_rooms[i].id)])
        random_files = random.sample(os.listdir(file_dir), 4)
        for idx, file_name in enumerate(random_files):
            upload_file_wname(file_dir+file_name, 'houseit',
                              path_name+"/"+str(idx)+".jpg")


# Hardcoded Values per request
hardcoded_price = [650, 800, 950, 1000, 800]
hardcoded_roomtype = ['Double', 'Single', 'Double', 'Double', 'Single']
hardcoded_moveins = [
    add_move_in("Early(1-10)", 'June', 'Late(21-31)', 'September', session),
    add_move_in("Early(1-10)", 'March', 'Late(21-31)', 'September', session),
    add_move_in("Early(1-10)", 'September', 'Late(21-31)', 'June', session),
    add_move_in('Anytime', 'Anytime', 'Anytime', 'Anytime', session),
    add_move_in("Early(1-10)", 'August', 'Late(21-31)', 'December', session),
]
hardcoded_bbs = [(2, 2), (1, 1.5), (2, 0.5), (1, 1), (1, 2)]
hardcoded_stays = [3, 6, 9, 12, 3]
hardcoded_looking = [[looking_for[1], looking_for[5], looking_for[12], others[-2]],
                     [looking_for[1], looking_for[others.index('No party')],
                      looking_for[others.index('Smoke free')],
                      looking_for[others.index('No overnight Guest')]],
                     [looking_for[others.index('Female only')],
                      looking_for[others.index('Party OK')],
                      looking_for[others.index('420 friendly')],
                      looking_for[others.index('Overnight guest OK')]],
                     [looking_for[others.index('Co-ed')],
                      looking_for[others.index(
                          'No party')],
                      looking_for[others.index('Smoke free')],
                      looking_for[others.index('Overnight guest OK')]],
                     [looking_for[others.index('Co-ed')],
                      looking_for[others.index(
                          'No party')],
                      looking_for[others.index('Smoke free')],
                      looking_for[others.index('Overnight guest OK')]],
                     ]
hardcoded_faci = [[facilities[i] for i in range(3)],
                  [facilities[i] for i in range(5)],
                  [facilities[i] for i in range(2, 6)],
                  [facilities[i] for i in range(5, 12)],
                  [facilities[i] for i in range(4, 8)]]

hardcoded_users = [keenan, cris, sonia, ali, amit]

hardcoded_intro = [
    """
    Hi, there. I’m Keenan and I’m from the Bay Area. I’m looking for a roommate for a double for the summer. Inside the 2B2B suit, we have one more suitmate in the other room and the living room is open for common space. I like basketball but for now, I stay home because of COVID as I’m very cautious about that. I do play the guitar but only in the common area. And I always wear headphones when listening to music. Please feel free to reach out and see if we are a good match!
    """,
    """
    Hello! I’m Cris and I’m planning to temporarily move back to LA for spring and summer quarter and looking for people to sublease my room for 6 months while I’m gone. You’ll be sharing the apartment with two quiet, responsible UCSD male students. We’re all currently working from home and practice social distancing whenever we need to go out for essentials so we’re looking for someone who is also COVID-19 conscious. Message me if you’re interested or need more details. 
    """,
    """
    Hi, there. I’m Sonia and I’m from the Bay Area. I’m looking for a roommate for a double at Costa Verde. You will be living with 2 other girls who are all sophomore and the same major as I am. We are really chill people, COVID conscious, sometimes we like to cook and watch Netflix in the common area. DM me if you’re interested and we can talk!
    """,
    """
    Hello! As I am traveling back to home, I want to sublease my whole apartment to someone who is clean and respectful. You can use everything in the room, just don’t break them. You can treat it as a single or a double, I’m okay with either as long as it’s clean at the end of the lease. A deposit of $1000 will be charged at the beginning and will return if everything in the room is intact. Message me if you’re interested!
    """,
    """
    What’s up y’all!  I’m Amit and I have a single room vacant in the other room and am looking for another male to fill up the space. I enjoy dancing, going out for food, sightseeing, and being outdoors. I’m also covid conscious, pet/substance/gender friendly, sociable, and organized/clean. So dm me if you’re interested.
    """
]
hardcoded_eta = [str(random.choice(list(range(1, 21)))) +
                 " mins" for _ in range(len(hardcoded_price))]
hardcoded_houses = [random.choice(addresses_generate)
                    for _ in range(len(hardcoded_price))]
hardcoded_rooms = []
for i in range(len(hardcoded_price)):
    temp_room = add_room(datetime.now(), hardcoded_roomtype[i],
                         hardcoded_price[i], True,
                         hardcoded_intro[i],
                         hardcoded_stays[i],
                         hardcoded_eta[i],
                         hardcoded_houses[i],
                         hardcoded_users[i],
                         hardcoded_moveins[i],
                         hardcoded_bbs[i][0],
                         hardcoded_bbs[i][1],
                         session)
    for temp_attr in hardcoded_looking[i]:
        add_house_attribute(temp_room, temp_attr, session)
    for temp_attr in hardcoded_faci[i]:
        add_house_attribute(temp_room, temp_attr, session)
    hardcoded_rooms.append(temp_room)
for i in range(k):
    path_name = "/".join(["user"+str(hardcoded_users[i].id), 'housing',
                          str(hardcoded_rooms[i].id)])
    random_files = random.sample(os.listdir(file_dir), 4)
    for idx, file_name in enumerate(random_files):
        upload_file_wname(file_dir+file_name, 'houseit',
                          path_name+"/"+str(idx)+".jpg")
generateMock(50)
print("created Mock Database!")
