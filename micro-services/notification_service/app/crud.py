from sqlalchemy.orm import Session
from app import models, schemas

# Ajouter une notification
def create_notification(db: Session, notification: schemas.NotificationCreate):
    db_notification = models.Notification(
        user_id=notification.user_id,
        message=notification.message
    )
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
    return db_notification

# Récupérer les notifications pour un utilisateur
def get_notifications_by_user(db: Session, user_id: int):
    return db.query(models.Notification).filter(models.Notification.user_id == user_id).all()

# Ajouter un abonnement
def create_subscription(db: Session, subscription: schemas.SubscriptionCreate):
    db_subscription = models.Subscription(
        subscriber_id=subscription.subscriber_id,
        subscribed_to_id=subscription.subscribed_to_id
    )
    db.add(db_subscription)
    db.commit()
    db.refresh(db_subscription)
    return db_subscription

# Récupérer les abonnements d'un utilisateur
def get_subscriptions(db: Session, subscriber_id: int):
    return db.query(models.Subscription).filter(models.Subscription.subscriber_id == subscriber_id).all()
