from app.db.database_setup import User, Room, Move_In,\
    House_Attribute, Attribute, Bookmark, Address, Stay_Period, Base
from app.util.aws.s3 import get_images, upload_file_wobject
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Create


def getSession(db_path):
    """
    get a given db session
    """
    engine = create_engine(db_path)
    Base.metadata.bind = engine
    DBSession = sessionmaker(bind=engine)
    session = DBSession()
    return session


def add_and_commit(db_row, session):
    session.add(db_row)
    session.commit()


def add_user(name, email, date_created, phone, description, school_year, major,
             session):
    User_to_add = User(name=name, email=email, date_created=date_created,
                       phone=phone, description=description,
                       school_year=school_year,
                       major=major)
    add_and_commit(User_to_add, session)
    return User_to_add


def add_address(distance, address, session):
    address_to_add = Address(address=address, distance=distance)
    add_and_commit(address_to_add, session)
    return address_to_add


def add_room(date_created, room_type, price, negotiable, description,
             stay_period, address,
             user, move_in, no_rooms, no_bathrooms,
             session):
    Room_to_add = Room(date_created=date_created, room_type=room_type,
                       price=price,
                       negotiable=negotiable,
                       description=description, stay_period=stay_period,
                       address=address,
                       user=user, move_in=move_in, no_rooms=no_rooms,
                       no_bathrooms=no_bathrooms)
    add_and_commit(Room_to_add, session)
    return Room_to_add


def add_move_in(early_date, late_date, session):
    Move_In_to_add = Move_In(early_date=early_date,
                             late_date=late_date)
    add_and_commit(Move_In_to_add, session)
    return Move_In_to_add


def add_stay_period(from_month, to_month, session):
    Stay_Period_to_add = Stay_Period(from_month=from_month,
                                     to_month=to_month)
    add_and_commit(Stay_Period_to_add, session)
    return Stay_Period_to_add


def add_house_attribute(room, house_attribute, session):

    house_attribute_to_add = check_exist(
        House_Attribute, session, ** {'room_id': room.id,
                                      'attribute_name': house_attribute.name})
    if not house_attribute_to_add:
        house_attribute_to_add = House_Attribute(
            room=room, house_attribute=house_attribute)
        add_and_commit(house_attribute_to_add, session)
    return house_attribute_to_add


def add_attribute(name, category, session):
    attribute_to_add = check_exist(Attribute, session, **
                                   {'name': name, 'category': category})
    if not attribute_to_add:
        attribute_to_add = Attribute(name=name, category=category)
        add_and_commit(attribute_to_add, session)
    return attribute_to_add


def add_bookmark(room, user, session):
    bookmark_to_add = check_exist(Bookmark, session, **
                                  {'room_id': room.id, 'user_id': user.id})
    if not bookmark_to_add:
        bookmark_to_add = Bookmark(room=room, user=user)
        add_and_commit(bookmark_to_add, session)
    return bookmark_to_add


def remove_bookmark(room, user, session):
    session.query(Bookmark).filter_by(
        room_id=room.id, user_id=user.id).delete()
    session.commit()
    return
# Read


def check_exist(db_obj, session, **condition):
    """Check if a row that satisfies a certain condition exists
    :param db_obj: Database Object like User
    :param session: a db connection session
    :param condition: kwargs like dict like {'name':'Cris'}
    :return: the row if a row exists, else None
    """
    row = session.query(db_obj).filter_by(**condition).first()
    return row


def read_user(email, session):
    return session.query(User).filter_by(email=email).one()


def read_rooms(session):
    return session.query(Room).all()


def room_json(room, session, test_mode=False):
    other_map = {'other': [], 'facilities': []}
    house_attrs = session.query(House_Attribute).filter(
        House_Attribute.room_id == room.id).all()
    house_move_in = session.query(Move_In).filter(
        Move_In.id == room.move_in_id).first()
    house_user = session.query(User).filter(
        User.id == room.user_id).first()
    for ha in house_attrs:
        category_name = session.query(Attribute).filter(
            Attribute.name == ha.attribute_name).first().category
        other_map[category_name].append(ha.attribute_name)
    r_json = room.serialize
    room_name = room.address.serialize['address'].split(",")[0]
    room_photos = ["photo1", "photo2"] if test_mode else \
        get_images("user"
                   + str(house_user.id),
                   extra_path=str(room.id)+"/")
    profile_photo = "profile_photo" if test_mode else 'https://houseit.s3.us-east-2.amazonaws.com/' + \
        get_images("user"+str(house_user.id), category="profile")[0]

    return_json = {
        'name': room_name,
        'location': room.address.serialize['address'],
        'distance': room.address.serialize['distance'],
        'pricePerMonth': r_json['price'],
        'from_month': room.stay_period.from_month.strftime("%B/%y"),
        'to_month': room.stay_period.to_month.strftime("%B/%y"),
        'early': house_move_in.early_date.strftime("%m/%d/%y"),
        'late': house_move_in.late_date.strftime("%m/%d/%y"),
        'roomType': r_json['room_type'],
        'other': other_map['other'],
        'facilities': other_map['facilities'],
        'leaserName': house_user.name,
        'leaserEmail': house_user.email,
        'leaserPhone': house_user.phone,
        'leaserSchoolYear': house_user.school_year,
        'leaserMajor': house_user.major,
        'photos': room_photos,
        'profilePhoto': profile_photo,
        'roomId': r_json['id'],
        'negotiable': r_json['negotiable'],
        'numBaths': r_json['no_bathrooms'],
        'numBeds': r_json['no_rooms'],
        'roomDescription': r_json['description'],
    }
    return return_json


# Update


def update_field(db_obj, session, condition={}, values={}):
    print("updating the field", condition, values)
    updated_obj = session.query(db_obj).filter_by(**condition).update(values)
    session.commit()
    return updated_obj

# write an attribute to database


def write_attr(names, category, room, session):
    for attribute in names:
        # check if an attribute exists
        new_attribute = check_exist(Attribute, session, **{'name': attribute})
        if not new_attribute:
            new_attribute = add_attribute(attribute, category, session)
        # finally add the house attribute
        add_house_attribute(room, new_attribute, session)

# write a single room to database


def write_room(room_json, session):
    # TODO: might need to add error handling upon database fail
    # gets room owner, assuming when a new room gets added the user exists
    room_owner = check_exist(
        User, session, **{'email': room_json['email']})
    room_name = room_json['location'].split(",")[0]
    print(room_json)
    early_interval, early_month = room_json['early'].split()
    late_interval, late_month = room_json['early'].split()
    new_move_in = check_exist(Move_In, session, **{



        'early_month': early_month,
        'late_month': late_month
    })
    if not new_move_in:
        new_move_in = add_move_in(early_month,
                                  late_month, session)

    new_room = add_room(datetime.now(),
                        room_json['roomType'],
                        room_json['pricePerMonth'],
                        room_json['negotiable'],
                        room_json['roomDescription'],
                        room_json['stayPeriod'],
                        room_json['distance'],
                        room_json['location'],
                        room_owner, new_move_in, int(room_json['numBeds']), float(room_json['numBaths']), session)
    write_attr(room_json['other'], 'other', new_room, session)
    write_attr(room_json['facilities'], 'facilities', new_room, session)
    # add photo
    for photo in room_json['photos']:
        path_name = "/".join(["user"+str(room_owner.id), 'housing',
                              str(new_room.id), photo.filename])
        upload_file_wobject(photo, 'houseit', path_name)  # Change to ID
    return True
