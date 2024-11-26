from sqlalchemy.orm import Session
from services.db import models
from services.db.models import User
from services.db.schemas import UserCreate
from services.db import schemas
import bcrypt

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    new_user = models.User(
        email=user.email,
        password_hash=hashed_password,
        name=user.name,
        role="creator"
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # Actualise l'objet pour inclure l'ID généré
    return new_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt.checkpw(password.encode("utf-8"), user.password_hash.encode("utf-8")):
        return user
    return None