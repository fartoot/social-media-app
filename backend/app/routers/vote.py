from fastapi import APIRouter, Depends, Response
from sqlalchemy.orm import Session
from .. import database, oauth2, schemas, models

router = APIRouter(
    prefix="/votes",
    tags=["Vote"]
)

@router.post("/")
def vote(vote: schemas.CreateVote ,db: Session = Depends(database.get_db), user_id: int = Depends(oauth2.verify_access_token)):
   vote_query = db.query(models.Vote).filter(models.Vote.post_id == vote.post_id , models.Vote.user_id == user_id)
   if not vote_query.first():
      db.add(models.Vote(post_id=vote.post_id,user_id=user_id))
      db.commit()
      return Response(status_code=201, content=f"User {user_id} add vote to post {vote.post_id}")
   else:
        vote_query.delete()
        db.commit()
        return Response(status_code=201, content=f"User {user_id} delete vote to post {vote.post_id}")