from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
  APP_NAME: str = "Users Microservice"
  APP_VERSION: str = "1.0.0"
  DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
  APP_PORT: int = os.getenv("APP_PORT", 8080)
  LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
  SECRET_KEY: str = os.getenv("SECRET_KEY", "supersecretkey")

  class Config:
      env_file = ".env"
      extra='ignore'

def get_settings() -> Settings:
  return Settings()