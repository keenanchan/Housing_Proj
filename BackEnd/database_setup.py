from sqlalchemy import Column, ForeignKey, Integer, String,FLOAT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship,backref
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    picture_room = relationship("PictureRoom", backref="user")
    picture_person = relationship("PicturePerson", backref="user")
    room = relationship("Room", backref="user")
    tenant_id = Column(Integer, ForeignKey('tenant.id'))
    tenant = relationship("Tenant",backref=backref("user",uselist=False))


class Room(Base):
    __tablename__ = 'room'

    id = Column(Integer, primary_key=True)
    intro = Column(String(2500), nullable=False)
    price_range = Column(String(250), nullable=False)
    stay_period = Column(String(250), nullable=False)
    move_time = Column(String(250), nullable=False)
    name = Column(String(250), nullable=False)
    lat = Column(FLOAT)
    lng = Column(FLOAT)
    user_id = Column(Integer, ForeignKey('user.id'))
    picture = relationship("PictureRoom",backref="room")
    others = relationship("Others",backref="room")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'id': self.id,
            'intro': self.intro,
            'price_range': self.price_range,
            'stay_period': self.stay_period,
            'move_time': self.move_time,
            'lat': self.lat,
            'lng': self.lng
        }

class Tenant(Base):
    __tablename__ = 'tenant'

    id = Column(Integer, primary_key=True)
    intro = Column(String(2500), nullable=False)
    price_range = Column(String(250), nullable=False)
    stay_period = Column(String(250), nullable=False)
    move_time = Column(String(250), nullable=False)
    r_type = Column(String(250), nullable=False)
    picture = relationship("PicturePerson",backref="tenant")
    others = relationship("OthersT",backref="tenant")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'r_type':self.r_type,
            'id': self.id,
            'intro': self.intro,
            'price_range': self.price_range,
            'stay_period': self.stay_period,
            'move_time': self.move_time
        }


class PictureRoom(Base):
    __tablename__ = 'pictureroom'

    id = Column(Integer, primary_key=True)
    picture = Column(String(250))
    type_n  = Column(String(250))
    room_id = Column(Integer, ForeignKey('room.id'), default=-1)
    user_id = Column(Integer, ForeignKey('user.id'))


class PicturePerson(Base):
    __tablename__ = 'pictureperson'

    id = Column(Integer, primary_key=True)
    type_n  = Column(String(250))
    picture = Column(String(250))
    tenant_id = Column(Integer, ForeignKey('tenant.id'), default=-1)
    user_id = Column(Integer, ForeignKey('user.id'))

class Others(Base):
    __tablename__ = 'others'

    id = Column(Integer, primary_key=True)
    name = Column(String(250))
    room_id = Column(Integer, ForeignKey('room.id'))

class OthersT(Base):
    __tablename__ = 'otherst'

    id = Column(Integer, primary_key=True)
    name = Column(String(250))
    tenant_id = Column(Integer, ForeignKey('tenant.id'))

engine = create_engine('sqlite:///housing.db')


Base.metadata.create_all(engine)