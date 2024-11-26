from fastapi import FastAPI, UploadFile, HTTPException
from azure.storage.blob import BlobServiceClient, BlobClient, generate_blob_sas, BlobSasPermissions
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Charger les variables d'environnement
load_dotenv()

# Configuration Azure Blob Storage
STORAGE_ACCOUNT_NAME = os.getenv("STORAGE_ACCOUNT_NAME")
STORAGE_ACCOUNT_KEY = os.getenv("STORAGE_ACCOUNT_KEY")
CONTAINER_NAME = os.getenv("CONTAINER_NAME")

# Initialisation du service Blob
blob_service_client = BlobServiceClient(
    account_url=f"https://{STORAGE_ACCOUNT_NAME}.blob.core.windows.net",
    credential=STORAGE_ACCOUNT_KEY,
)
container_client = blob_service_client.get_container_client(CONTAINER_NAME)

# Initialisation de l'application FastAPI
app = FastAPI()

# Fonction pour générer une URL SAS
def generate_sas_url(blob_name: str) -> str:
    """
    Génère une URL SAS pour un fichier blob.

    Args:
        blob_name (str): Le nom du fichier blob.

    Returns:
        str: L'URL SAS permettant d'accéder au blob.
    """
    sas_token = generate_blob_sas(
        account_name=STORAGE_ACCOUNT_NAME,
        container_name=CONTAINER_NAME,
        blob_name=blob_name,
        account_key=STORAGE_ACCOUNT_KEY,
        permission=BlobSasPermissions(read=True),  # Lecture seule
        expiry=datetime.now() + timedelta(hours=1),  # Expire dans 1 heure
    )
    return f"https://{STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/{blob_name}?{sas_token}"

# Endpoint pour uploader un fichier
@app.post("/media/upload")
async def upload_file(file: UploadFile):
    try:
        # Créer un BlobClient pour le fichier
        blob_client = container_client.get_blob_client(file.filename)

        # Télécharger le fichier dans le conteneur Blob
        blob_client.upload_blob(file.file, overwrite=True)

        # Retourner l'URL publique ou SAS si le conteneur est privé
        file_url = f"https://{STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/{file.filename}"
        return {"msg": "File uploaded successfully", "file_url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error uploading file: {str(e)}")

# Endpoint pour récupérer un fichier avec une URL SAS
@app.get("/media/{file_name}")
async def get_file(file_name: str):
    try:
        # Vérifier si le fichier existe sur Azure Blob Storage
        blob_client = container_client.get_blob_client(file_name)
        if not blob_client.exists():
            raise HTTPException(status_code=404, detail="File not found")

        # Générer une URL SAS
        file_url = generate_sas_url(file_name)
        return {"file_url": file_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving file: {str(e)}")
