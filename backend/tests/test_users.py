from jose import jwt
from app.config import settings
from app import schemas
import pytest

def test_root(client):
    res = client.get("/")
    assert res.json().get("response") == "Hello World"
    assert res.status_code == 200


def test_login_user(client,created_user):
    user = {
                "username": created_user["username"],
                "password": created_user["password"]
            }
 
    res = client.post("/login",data=user)
    login_res = schemas.Token(**res.json())
    payload = jwt.decode(token=login_res.access_token,key=settings.secret_key,algorithms=[settings.algorithm])
    id = payload.get("user_id")
    assert id == created_user["id"]
    assert login_res.token_type == "bearer"
    assert res.status_code == 200
    
    
    
    
@pytest.mark.parametrize("username, password, status_code",[
    ("wronguser","test123",403),
    ("test123","wrongpassword",403),
    ("wronguser","wrongpassword",403),
    (None,"test123",422),
    ("test123",None,422),
])
def test_incorrect_login(client,username,password,status_code):

    user = {
                "username": username,
                "password": password 
            }
    res = client.post("/login",data=user)
    assert res.status_code == status_code 
    # assert res.json().get("detail") == "Invalid Credentials"