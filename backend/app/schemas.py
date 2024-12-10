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

class ResponseUser(UserBase):
    id: int
    created_at: datetime
    first_name: str
    last_name: str
    username: str

    model_config = ConfigDict(from_attributes=True)

    # class Config:
    #     orm_mode = True

class ResponsePost(BaseModel):
    content : str
    published: bool
    owner: ResponseUser 
    model_config = ConfigDict(from_attributes=True)

    # class Config:
    #     orm_mode = True





class CreateUser(UserBase):
    photo: str | None = "profile.png"
    bio: str | None
    first_name: str
    last_name : str
    username: str
    password : str


        

class Login(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    
class Vote(BaseModel):
    post_id: int