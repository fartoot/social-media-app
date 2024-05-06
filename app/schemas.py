from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional

    
class PostBase(BaseModel):
    title : str 
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
    
    class Config:
        orm_mode = True

class ResponsePost(BaseModel):
    title : str 
    content : str
    published: bool
    owner: ResponseUser 
    class Config:
        orm_mode = True






class CreateUser(UserBase):
    password : str


        

class Login(BaseModel):
    email: EmailStr
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str
    
class Vote(BaseModel):
    post_id: int