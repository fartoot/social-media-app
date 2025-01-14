from fastapi import Depends, Response , APIRouter, HTTPException
from typing import List
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from .. import schemas
from .. import utils
from .. import oauth2 

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/",status_code=201,response_model=schemas.ResponseUser)
def create_user(user: schemas.CreateUser, db: Session = Depends(get_db)):
    hashed_pass = utils.hash(user.password)
    user.password = hashed_pass
    user_info = models.User(**user.dict())
    db.add(user_info)
    db.commit()
    db.refresh(user_info)
    
    return user_info


@router.get("/{id}",status_code=200, response_model=schemas.ResponseUser)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if user:
            return user
    else:
        return Response(status_code=404)
    
@router.get("/",status_code=201,response_model=schemas.ResponseUser)
def get_profile(user_id: int = Depends(oauth2.verify_access_token), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user:
            return user
    else:
        return Response(status_code=404)

@router.put("/",status_code=201,response_model=schemas.ResponseUser)
def edit_user(updated_user : schemas.UpdateUser, user_id: int = Depends(oauth2.verify_access_token), db: Session = Depends(get_db)):
    user_found = db.query(models.User).filter(models.User.id == user_id)
    user = user_found.first()
    
    if user is None:
        raise HTTPException(status_code=404, detail=f"user with id: {id} does not exist")
    
    if user:
        user_data = {**updated_user.dict(exclude_none=True)}
        if user_data.get("password"):
            user_data["password"] = utils.hash(user_data["password"])
        user_found.update(user_data)
        db.commit()
        return user
    else:
        return Response(status_code=404)