from datetime import datetime
from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional

    
class PostBase(BaseModel):
    content : str
    published: Optional[bool] = True    


class CreatePost(PostBase):
    pass

class UpdatePost(PostBase):
    pass


class UserBase(BaseModel):
    email : EmailStr


class CreateVote(BaseModel):
    post_id: int 
    model_config = ConfigDict(from_attributes=True)
    
class Vote(CreateVote):
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
    
class ResponseUser(UserBase):
    id: int
    first_name: str
    last_name: str
    username: str
    bio: str
    photo: str
    model_config = ConfigDict(from_attributes=True)


class ResponsePostWithoutVote(BaseModel):
    id: int
    content : str
    published: bool
    created_at: datetime
    owner: ResponseUser 
    model_config = ConfigDict(from_attributes=True)
    
class ResponsePostWithVote(BaseModel):
    Post: ResponsePostWithoutVote 
    Vote: Vote
    model_config = ConfigDict(from_attributes=True)
    
class ResponsePost(ResponsePostWithoutVote):
    votes: int = 0



class CreateUser(UserBase):
    photo: str | None = "profile.png"
    bio: str | None
    first_name: str
    last_name : str
    username: str
    password : str

class UpdateUser(BaseModel):
    photo: str | None = None
    bio: str | None = None
    first_name: str | None = None 
    last_name : str | None  = None
    username: str | None  = None
    password : str | None  = None
    email : str | None  = None

class Login(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    