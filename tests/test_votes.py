def test_authorized_create_vote(authorized_client,create_fake_posts):
    res = authorized_client.post("/votes/",json={"post_id":create_fake_posts[1].id})
    assert res.status_code == 201