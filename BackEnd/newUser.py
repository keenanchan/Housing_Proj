from sqlalchemy import Column, ForeignKey, Integer, String, FLOAT, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    date_created = Column(DateTime, nullable=False)
    # Represention: (123)-456-7890, is this nullable?
    phone = Column(String(14))
    name = Column(String(250), nullable=False)
    description = Column(String(500))
    avatar_photo = relationship(
        "PicturePerson", backref="user")  # how to store photo?
    tenant_id = Column(Integer, ForeignKey('tenant.id'))
    host_id = Column(Integer, ForeignKey('host.id'))
