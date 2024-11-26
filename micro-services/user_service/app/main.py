from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas, crud
from app.database import engine, get_db
from fastapi.security import OAuth2PasswordRequestForm

# Création des tables dans la base de données
models.Base.metadata.create_all(bind=engine)

# Initialisation de l'application FastAPI
app = FastAPI()

# Endpoint pour inscrire un utilisateur
@app.post("/users/register", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = crud.create_user(db=db, user=user)
    
    # Convertir en UserResponse
    return schemas.UserResponse(
        id=new_user.user_id,
        email=new_user.email,
        name=new_user.name,
        bio=new_user.bio,
        role=new_user.role,
    )


@app.post("/users/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    return {"access_token": "token", "token_type": "bearer"}