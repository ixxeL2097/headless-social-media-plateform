from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services.db import schemas, crud
from services.db.db import get_db
from fastapi.security import OAuth2PasswordRequestForm
from core.logger import logger

router = APIRouter(prefix="/users", tags=["users"])

# Endpoint pour inscrire un utilisateur
@router.post("/register", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        logger.info(f"[ WARNING ] > User already exists : {user.name}, {user.email}")
        raise HTTPException(status_code=400, detail="Email already registered")
    
    logger.info(f"[ PROCESSING ] > Creating user : {user.name}, {user.email}")
    new_user = crud.create_user(db=db, user=user)
    
    # Convertir en UserResponse
    return schemas.UserResponse(
        id=new_user.user_id,
        email=new_user.email,
        name=new_user.name,
        bio=new_user.bio,
        role=new_user.role,
    )

# Endpoint pour logguer un utilisateur
@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    logger.info(f"[ PROCESSING ] > Logging user : {user.name}, {user.email}")
    return {"access_token": "token", "token_type": "bearer"}