from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import PictureRoom, Tenant, OthersT, Others, PicturePerson, User, Room, Base


engine = create_engine('sqlite:///db/housing.db')
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


# Create dummy user
User1 = User(name="STOOPID", email="system@ucsd.com")
session.add(User1)
session.commit()

User2 = User(name="Sgfhg", email="system@ucsd.com")
session.add(User2)
session.commit()

room = Room(user=User1, intro="Share bathroom, no pets, parking spot",
            price_range="$550-1100", stay_period="One Year Lease", move_time="Mid September",
            name="Costa Verde Village- 2B2B- Single/Double", lng=-117.2168, lat=32.8702)
session.add(room)
session.commit()

pic1 = PictureRoom(picture="./app/resources/costa.png",
                   type_n="main_room", room=room, user=User1)
session.add(pic1)
session.commit()


pic2 = PictureRoom(picture="./app/resources/costa2.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic2)
session.commit()

pic3 = PictureRoom(picture="./app/resources/costa3.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic3)
session.commit()

pic4 = PictureRoom(picture="./app/resources/costa4.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic4)
session.commit()

pic5 = PictureRoom(picture="./app/resources/costa5.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic5)
session.commit()

pic6 = PictureRoom(picture="./app/resources/costa6.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic6)
session.commit()

pic7 = PictureRoom(picture="./app/resources/costa7.jpg",
                   type_n="room", room=room, user=User1)
session.add(pic7)
session.commit()

other = Others(name="patio", room=room)
session.add(other)
session.commit()

tenant = Tenant(user=User1, intro="I am a very STOOPID PERSON",
                price_range="$550-1100", stay_period="One Year Lease", move_time="Mid September", r_type="Single/Double")
session.add(tenant)
session.commit()

pic_t = PicturePerson(picture="https://cdn130.picsart.com/283184513034211.png",
                      type_n="profile_pic", tenant=tenant, user=User1)
session.add(pic_t)
session.commit()


otherst = OthersT(name="patio", tenant=tenant)
session.add(otherst)
session.commit()

tenant2 = Tenant(user=User2, intro="I am a very STOOPID guy",
                 price_range="$550-20000", stay_period="One Year Lease", move_time="Mid July", r_type="Single/Double")
session.add(tenant2)
session.commit()

pic_t = PicturePerson(picture="https://i2.wp.com/thisis50.com/wp-content/uploads/2018/03/treway.jpg",
                      type_n="profile_pic", tenant=tenant2, user=User2)
session.add(pic_t)
session.commit()


otherst = OthersT(name="utility", tenant=tenant2)
session.add(otherst)
session.commit()


print("added menu items!")
