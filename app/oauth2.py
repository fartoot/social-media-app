from datetime import datetime , timedelta
from jose import jwt, JWTError
from fastapi import HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from .config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp":expire})
    return jwt.encode(to_encode,SECRET_KEY,algorithm=ALGORITHM)



def verify_access_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token=token,key=SECRET_KEY,algorithms=[ALGORITHM])
        if not payload:
            raise HTTPException(status_code=401, detail="Could not validate credentials", headers={"WWW-Authenticate":"Bearer"})
            
        id: str = payload.get("user_id")
        if id is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials", headers={"WWW-Authenticate":"Bearer"})

        return id
    except:
        raise  HTTPException(status_code=401, detail="Could not validate credentials", headers={"WWW-Authenticate":"Bearer"})
    