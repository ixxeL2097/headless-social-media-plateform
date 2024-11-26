from pydantic import BaseModel
from typing import List
from pydantic import BaseModel
from datetime import datetime

# Schéma pour créer une notification
class NotificationCreate(BaseModel):
    user_id: int
    message: str

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    message: str
    created_at: datetime  # Champ datetime

    class Config:
        form_attributes = True
        json_encoders = {
            datetime: lambda v: v.isoformat()  # Convertit datetime en format ISO 8601
        }   

# Schéma pour créer un abonnement
class SubscriptionCreate(BaseModel):
    subscriber_id: int  # ID de l'utilisateur abonné
    subscribed_to_id: int  # ID de l'utilisateur suivi

class SubscriptionResponse(BaseModel):
    id: int  # ID de l'abonnement
    subscriber_id: int
    subscribed_to_id: int

    class Config:
        form_attributes = True