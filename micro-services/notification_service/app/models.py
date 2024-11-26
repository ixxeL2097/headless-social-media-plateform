from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

# Table des notifications
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)  # Identifiant unique de la notification
    user_id = Column(Integer, nullable=False)  # Référence vers la table `users`
    message = Column(String, nullable=False)  # Contenu de la notification
    is_read = Column(Boolean, default=False)  # Indique si la notification a été lue
    created_at = Column(DateTime, server_default=func.now()) # Date de création de la notification

# Table des abonnements (subscriptions)
class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(Integer, primary_key=True, index=True)
    subscriber_id = Column(Integer, nullable=False)  # ID de l'abonné
    subscribed_to_id = Column(Integer, nullable=False)  # ID de l'utilisateur suivi
