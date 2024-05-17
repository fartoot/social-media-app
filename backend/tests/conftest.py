from app import schemas
from fastapi.testclient import TestClient
from app.main import app
from app import schemas
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
from app.config import settings
from app.database import get_db, Base
from app.oauth2 import create_access_token
from app import models
import pytest


##### config related to database #####
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{settings.database_username}:{settings.database_password}@{settings.database_hostname}:{settings.database_port}/{settings.database_name}_test"

engine = create_engine(SQLALCHEMY_DATABASE_URL) 
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture()
def session():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@pytest.fixture()
def client(session):
    def override_get_db():
        try:
            yield session
        finally:
           session.close() 

    app.dependency_overrides[get_db] = override_get_db
    yield TestClient(app)
    



##### testing user #####
@pytest.fixture()
def created_user(client):

    user = {
                "email": "test@gmail.com",
                "password": "test123"
            }
    
    res = client.post("/users/",json=user)
    new_user = schemas.ResponseUser(**res.json())
    assert res.status_code == 201
    assert new_user.email == "test@gmail.com" 

    created_user = res.json()
    created_user["password"]= user["password"]
    return created_user

@pytest.fixture
def token(created_user):
    return create_access_token({"user_id": created_user["id"]})


@pytest.fixture
def authorized_client(client, token):
    client.headers = {
        **client.headers,
        "Authorization":f"Bearer {token}"
    }
    return client


@pytest.fixture    
def create_fake_posts(created_user,session):
    fake_posts = [
        {
            "title":"first title",
            "content":"first content",
            "owner_id": created_user["id"] 
        },
        {
            "title":"second title",
            "content":"second content",
            "owner_id": created_user["id"] 
        },
        {
            "title":"third title",
            "content":"third content",
            "owner_id": created_user["id"] 
        },
    ]

    def create_post_model(post):
        return models.Post(**post)

    post_map = map(create_post_model, fake_posts)
    posts = list(post_map)
    

    session.add_all(posts)
    session.commit()
    return session.query(models.Post).all()