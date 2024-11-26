from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from core.config import get_settings

# On recupere les variables d'environnement
settings = get_settings()
# Créer l'engine SQLAlchemy
engine = create_engine(settings.DATABASE_URL)
# Créer une session locale
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base pour les modèles
Base = declarative_base()
# Dépendency pour obtenir une session de base de données
def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
