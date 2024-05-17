from fastapi import Depends, HTTPException, Response , APIRouter
from typing import List
from sqlalchemy.orm import Session
from ..database import get_db
from .. import models, schemas, oauth2


router = APIRouter(
    prefix="/posts",
    tags=["Posts"]
)


@router.get("/",status_code=200, response_model=List[schemas.ResponsePost])
def get_posts(db: Session = Depends(get_db), user_id: int = Depends(oauth2.verify_access_token),limit: int = 10,search: str = ""):
    posts = db.query(models.Post).filter(models.Post.title.contains(search)).limit(limit).all()
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