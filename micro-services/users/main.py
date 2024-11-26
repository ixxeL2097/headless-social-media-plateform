from fastapi import FastAPI
from core.config import get_settings
import uvicorn
from sqlalchemy import text
from services.db.db import engine
from api.v1.routes import users
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Charge les parametres applicatifs (variables d'environnement)
settings = get_settings()

# Fonction de creation de l'application FastAPI
def create_app() -> FastAPI:
  app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Kubernetes Management API"
  )
  app.include_router(users.router, prefix="/v1")
  # Ajouter CORS pour faciliter les tests
  app.add_middleware(
      CORSMiddleware,
      allow_origins=["*"],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )

  return app

# on cree l'app pour la servir avec uvicorn
app = create_app()

@app.exception_handler(404)
async def not_found_handler(request, exc):
    print(f"❌ Route not found: {request.url.path}")
    return JSONResponse(
        status_code=404,
        content={"message": f"Route '{request.url.path}' not found"},
    )

@app.on_event("startup")
async def log_routes():
    print("\n📋 Exposed routes:")
    for route in app.router.routes:
        print(f"➡️  {route.path} [{route.methods}]")

@app.on_event("startup")
async def test_db_connection():
    import time  # Importation pour la gestion des délais

    MAX_RETRIES = 5
    RETRY_DELAY = 5  # En secondes

    for attempt in range(MAX_RETRIES):
        try:
            with engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            print("✅ Connection to the database was successful.")
            return  # Sortir de la boucle si la connexion réussit
        except Exception as e:
            print(f"❌ Failed to connect to the database (attempt {attempt + 1}/{MAX_RETRIES}):", e)
            if attempt < MAX_RETRIES - 1:
                time.sleep(RETRY_DELAY)  # Attendre avant de réessayer
            else:
                print("❌ Could not connect to the database after multiple attempts.")
                raise  # Relancer l'exception après les tentatives

if __name__ == "__main__":
  uvicorn.run(
    "main:app",
    host="0.0.0.0",
    port=settings.APP_PORT,
    reload=True,
    use_colors=True
  )

# # Inclure les routes
# app.include_router(users_router, prefix="/api/v1/users", tags=["Users"])

# @app.get("/")
# async def root():
#     return {"message": "Welcome to the Users Service"}
