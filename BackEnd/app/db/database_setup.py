from sqlalchemy import Column, ForeignKey, Integer, String,FLOAT
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship,backref
from sqlalchemy import create_engine

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    phone = Column(String(250), nullable=False)
    name = Column(String(250), nullable=False)
    description = Column(String(1000), nullable=False)
    avatar_picture = relationship("PicturePerson", backref="user")
    photo = relationship("Photo", backref="user")
    room = relationship("Room", backref="user")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'email': self.email,
            'phone': self.phone
            'name': self.name
            'description': self.description,
            'avatar_picture': self.avatar_picture
        }
class Room(Base):
    __tablename__ = 'room'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    room_type = Column(String(250), nullable=False)
    move_in = Column(String(250), nullable=False)
    price = Column(Integer, nullable=False)
    description = Column(String(1000), nullable=False)
    stay_period = Column(String(250), nullable=False)
    distance = Column(FLOAT)
    address = Column(String(250), nullable=False)
    photo_url = Column(String(250), ForeignKey="photo.url")
    move_in_id = Column(Integer, ForeignKey="move_in.id")
    user = relationship("User",backref="room")
    photo = relationship("Photo",backref="room")
    others = relationship("Others",backref="room")
    move_in = relationship("Move_In",backref="room")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'room_type': self.room_type
            'move_in': self.move_in
            'intro': self.intro,
            'price': self.price,
            'description': self.description,
            'stay_period': self.stay_period,
            'distance': self.distance,
            'address': self.address,
            'photo_url': self.photo_url
        }

class Photo(Base):
    __tablename__ = 'photo'
    
    id = Column(Integer, primary_key=True)
    url = Column(String(250), nullable=False)
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship("User",backref="photo")
    
    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'url': self.url,
            'user_id': self.user_id
        }
    
class Move_In(Base):
    __tablename__ = 'move_in'
    
    id = Column(Integer, primary_key=True)
    early_interval = Column(String(250), nullable=False)
    early_month = Column(String(250), nullable=False)
    late_interval = Column(String(250), nullable=False)
    late_month = Column(String(250), nullable=False)
    room_id = Column(Integer, ForeignKey('room.id'))
    room = relationship("Room", backref="move_in")

    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'early_interval': self.early_interval,
            'early_month': self.early_month,
            'late_interval': self.late_interval,
            'late_month': self.late_month,
            'room_id': self.room_id
        }

class House_Attribute(Base):
    __tablename__ = 'house_attribute'
    
    id = Column(Integer, primary_key=True)
    room_id = Column(Integer, ForeignKey('room.id'))
    attribute_name = Column(String(250), nullable=False)
    
    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'id': self.id,
            'room_id': self.room_id,
            'attribute_name': self.attribute_name
        }
    
class Attribute(Base):
    __tablename__ = 'attribute'
    
    name = Column(String(250), primary_key=True)
    category = Column(String(250), nullable=False)
    house_attribute_id = Column(Integer, ForeignKey('house_attribute.id'))
    house_attribute = relationship("House_Attribute", backref="user")
    
    @property
    def serialize(self):
        """Return object data in easily serializeable format"""
        return {
            'name': self.name,
            'category': self.category,
            'house_attribute_id': self.house_attribute_id
        }

engine = create_engine('sqlite:///housing.db')


Base.metadata.create_all(engine)
