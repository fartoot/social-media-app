from app import schemas
import pytest
def test_get_all_posts(authorized_client,create_fake_posts):
    res = authorized_client.get("/posts/")
    def validate(post):
       schemas.ResponsePost(**post)
    map(validate,res.json())
    assert res.status_code == 200
    assert len(res.json()) == len(create_fake_posts)


def test_unauthorized_user_get_all_posts(client,create_fake_posts):
    res = client.get("/posts/")
    assert res.status_code == 401


def test_unauthorized_user_get_one_post(client,create_fake_posts):
    res = client.get(f"/posts/{create_fake_posts[0].id}")
    assert res.status_code == 401


def test_get_one_post_not_exist(authorized_client,create_fake_posts):
    res = authorized_client.get("/posts/999")
    assert res.status_code == 404


def test_get_one_post(authorized_client,create_fake_posts):
    res = authorized_client.get(f"/posts/{create_fake_posts[0].id}")
    post = schemas.ResponsePost(**res.json())
    print(post)
    assert post.owner.id == create_fake_posts[0].id
    assert res.status_code == 200 

@pytest.mark.parametrize("title, content, published", [
    ("test title 1", "test content 1", True),
    ("test title 2", "test content 2", False),
    ("test title 3", "test content 3", True),
])
def test_create_post(authorized_client,created_user,title, content, published):
    res = authorized_client.post("/posts/", json={"title":title, "content":content, "published": published})
    assert res.status_code == 201
    created_post = schemas.CreatePost(**res.json()) 
    assert created_post.title == title
    assert created_post.content == content
    assert created_post.published == published

def test_unauthorized_user_create_post(client):
    res = client.post("/posts/",json={"title":"test title","content":"test content"})
    assert res.status_code == 401

def test_unauthorized_user_delete_post(client,created_user,create_fake_posts):
    res = client.delete(f"/posts/{create_fake_posts[0].id}")
    assert res.status_code == 401


def test_authorized_user_delete_post(authorized_client,create_fake_posts):
    print(create_fake_posts[0].id)
    res = authorized_client.delete(f"/posts/{create_fake_posts[0].id}")
    assert res.status_code == 204 

def test_delete_post_non_exist(authorized_client,create_fake_posts):
    res = authorized_client.delete("/posts/9999")
    assert res.status_code == 404 



def test_authorized_update_post(authorized_client,create_fake_posts):
    data={
        "title": "test updated title",
        "content": "test updated content",
    }
    res = authorized_client.put(f"/posts/{create_fake_posts[0].id}",json=data)
    assert res.status_code == 200 
    updated_post = schemas.ResponsePost(**res.json())
    assert updated_post.title == data["title"]
    assert updated_post.content == data["content"]


def test_unauthorized_user_update_post(client,created_user,create_fake_posts):
    data={
        "title": "test updated title",
        "content": "test updated content",
    }

    res = client.put(f"/posts/{create_fake_posts[0].id}",json=data)
    assert res.status_code == 401

def test_update_one_post_not_exist(authorized_client,create_fake_posts):
    data={
        "title": "test updated title",
        "content": "test updated content",
    }

    res = authorized_client.put("/posts/999",json=data)
    assert res.status_code == 404