from fastapi import Depends, Response , APIRouter
from typing import List
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models
from .. import schemas
from .. import utils

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/",status_code=200,response_model=schemas.ResponseUser)
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
    