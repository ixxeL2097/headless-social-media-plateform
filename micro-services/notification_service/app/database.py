from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de connexion SQLite
DATABASE_URL = "sqlite:///./notifications.db"

# Crée une connexion à la base
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Configure la session locale
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base pour les modèles SQLAlchemy
Base = declarative_base()

# Fonction pour obtenir une session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()