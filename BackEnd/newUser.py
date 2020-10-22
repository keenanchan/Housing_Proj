from sqlalchemy import Column, ForeignKey, Integer, String, FLOAT, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref

Base = declarative_base()


class User(Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(String(250), nullable=False)
    # Represention: (123)-456-7890, is this nullable?
    date_created = Column(DateTime, nullable=False)
    phone = Column(String(14))
    name = Column(String(250), nullable=False)
    description = Column(String(500))
    avatar_photo = Column(String(500))  # photo=url
    tenant_id = Column(Integer, ForeignKey('tenant.id'))
    host_id = Column(Integer, ForeignKey('host.id'))
