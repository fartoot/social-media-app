from fastapi import Depends, HTTPException, Response , APIRouter
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import func 
from ..database import get_db
from .. import models, schemas, oauth2


router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.get("/",status_code=200, response_model=List[schemas.ResponsePost])
def get_posts(db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token),limit: int = 100,search: str = ""):
    posts = db.query(
        models.Post,
        func.count(models.Vote.post_id).label("votes")
    ).join(
        models.User,
        models.Post.owner_id == models.User.id
    ).outerjoin(
        models.Vote,
        models.Post.id == models.Vote.post_id
    ).group_by(
        models.Post.id,
        models.User.id
    ).filter(
        models.Post.content.contains(search)
    ).order_by(
        models.Post.created_at.desc()
    ).limit(limit).all()
    
    result_posts = []
    for post, votes in posts:
        post_dict = {
            "id": post.id,
            "content": post.content,
            "published": post.published,
            "created_at": post.created_at,
            "owner": post.owner,
            "votes": votes
        }
        result_posts.append(post_dict)
    
    return result_posts

@router.get("/popular",status_code=200, response_model=List[schemas.ResponsePost])
def popular(db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token), search: str = ""):
    posts = db.query(
        models.Post,
        func.count(models.Vote.post_id).label("votes")
    ).join(
        models.User,
        models.Post.owner_id == models.User.id
    ).outerjoin(
        models.Vote,
        models.Post.id == models.Vote.post_id
    ).group_by(
        models.Post.id,
        models.User.id
    ).filter(
        models.Post.content.contains(search)
    ).order_by(
        func.count(models.Vote.post_id).desc()
    ).limit(4).all()

    result_posts = []
    for post, votes in posts:
        post_dict = {
            "id": post.id,
            "content": post.content,
            "published": post.published,
            "created_at": post.created_at,
            "owner": post.owner,
            "votes": votes
        }
        result_posts.append(post_dict)

    return result_posts
    
    
@router.get("/recent",status_code=200, response_model=List[schemas.ResponsePostWithVote])
def get_recent_posts_vote(db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token)):
    posts = db.query(
        models.Post,
        models.Vote
    ).join(
        models.Vote,
        models.Post.id == models.Vote.post_id
    ).join(
        models.User,
        models.Post.owner_id == models.User.id 
    ).filter(
        models.Vote.user_id == user_id
    ).order_by(
        models.Vote.created_at.desc()
    ).limit(6).all()
    
    return posts

@router.post("/", status_code=201)
def create_post(post: schemas.CreatePost, db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token)):
    created_post = models.Post(owner_id= user_id, **post.dict())
    db.add(created_post)
    db.commit()
    db.refresh(created_post)
    return created_post



@router.get("/{id}",status_code=200, response_model=schemas.ResponsePost)
def get_post(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if post:
        return post
    else:
        return Response(status_code=404)
    
    
@router.delete("/{id}", status_code=204)
def delete_post(id: int, db: Session = Depends(get_db), user_id: int= Depends(oauth2.verify_access_token)):
    post = db.query(models.Post).filter(models.Post.id == id).first()
    if post == None:
        raise HTTPException(status_code=404, detail=f"post with id: {id} does not exist")
        
    if post.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to perform request action")
    if post:
        db.delete(post)
        db.commit() 
        return Response(status_code=204) 
    else:
        return Response(status_code=404)

    
@router.put("/{id}",status_code=200, response_model=schemas.ResponsePost)
def update_post(id: int,updated_post: schemas.UpdatePost, db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token)):
    
    post_found = db.query(models.Post).filter(models.Post.id == id)
    post = post_found.first()
    
    if post == None:
        raise HTTPException(status_code=404, detail=f"post with id: {id} does not exist")

    if post.owner_id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to perform request action")
    
    if post:
        post_found.update(updated_post.dict())
        # post_found.update({"owner_id":user_id})
        db.commit()
        return post 
    else:
        return Response(status_code=404)


@router.get("/user/{id}", status_code=201)
def get_posts_by_user_id(id: int, db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token)):
  posts = db.query(
          models.Post,
          func.count(models.Vote.post_id).label("votes")
      ).join(
          models.User,
          models.Post.owner_id == models.User.id
      ).outerjoin(
          models.Vote,
          models.Post.id == models.Vote.post_id
      ).group_by(
          models.Post.id,
          models.User.id
      ).filter(
          models.Post.owner_id == id
      ).order_by(
          models.Post.created_at.desc()
      ).limit(10).all()

  result_posts = []
  for post, votes in posts:
      post_dict = {
          "id": post.id,
          "content": post.content,
          "published": post.published,
          "created_at": post.created_at,
          "owner": post.owner,
          "votes": votes
      }
      result_posts.append(post_dict)

  return result_posts