from fastapi import FastAPI, HTTPException, Depends
from typing import List
from pydantic import BaseModel
from app.database import engine
from app.models import Base
from app import crud, schemas
from sqlalchemy.orm import Session
from app.database import get_db
from app.database import engine, Base
from app import models
from app.models import Notification, Subscription

app = FastAPI()

# Modèle de notification
class Notification(BaseModel):
    user_id: int
    message: str

# Stockage temporaire des notifications
notifications = []

# Créer les tables
Base.metadata.create_all(bind=engine)

@app.post("/notifications", response_model=schemas.NotificationResponse)
def send_notification(notification: schemas.NotificationCreate, db: Session = Depends(get_db)):
    db_notification = models.Notification(
        user_id=notification.user_id,
        message=notification.message,
        is_read=False  # Initialisé à `False` par défaut
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

@app.get("/notifications/{user_id}", response_model=List[schemas.NotificationResponse])
def get_notifications(user_id: int, db: Session = Depends(get_db)):
    return crud.get_notifications_by_user(db=db, user_id=user_id)

@app.get("/followers/{user_id}", response_model=List[schemas.SubscriptionResponse])
def get_followers(user_id: int, db: Session = Depends(get_db)):
    followers = db.query(models.Subscription).filter(models.Subscription.subscribed_to_id == user_id).all()
    return followers