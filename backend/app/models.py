from sqlalchemy import Column, ForeignKey, Integer,Text, String, Boolean
from sqlalchemy.sql.expression import text,true
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.orm import relationship
from .database import Base


class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True)
    content = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text("now()"))
    published = Column(Boolean, server_default=true(),default=True)
    owner_id = Column(Integer,ForeignKey("users.id", ondelete="CASCADE"),nullable=False)
    
    owner = relationship("User")
    votes = relationship("Vote")


class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True,nullable=False)
    photo = Column(String(200), nullable=True, default="profile.png")
    bio = Column(String(300), nullable=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    username = Column(String(50), nullable=False,unique=True)
    email = Column(String(200), nullable=False, unique=True)
    password = Column(String(200), nullable=False)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text("now()"))
    
class Vote(Base):
    __tablename__ = "votes"
    
    post_id = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"),nullable=False,primary_key=True)
    user_id= Column(Integer, ForeignKey("users.id", ondelete="CASCADE"),nullable=False,primary_key=True)
    created_at = Column(TIMESTAMP(timezone=True),nullable=False,server_default=text("now()"))