from fastapi import  APIRouter, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import schemas, database, models, utils, oauth2


router = APIRouter(
    tags=["Authentication"]
)



@router.post("/login", response_model=schemas.Token,status_code=200)
def login(login_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    
    user = db.query(models.User).filter(models.User.email == login_credentials.username).first()
    if not user:
        raise HTTPException(status_code=403, detail="Invalid Credentials")
    
    if not utils.verify(login_credentials.password,user.password):
        raise HTTPException(status_code=403, detail="Invalid Credentials")

    access_token = oauth2.create_access_token({"user_id":user.id}) 
    
    return {"access_token": access_token, "token_type" : "bearer"}