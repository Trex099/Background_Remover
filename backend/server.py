from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime
import base64
import io
from PIL import Image
from rembg import remove
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="ClearCut AI - Background Removal API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class BackgroundRemovalResponse(BaseModel):
    success: bool
    image_base64: str = None
    original_filename: str = None
    error_message: str = None

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "ClearCut AI Background Removal API", "status": "active"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/remove-background", response_model=BackgroundRemovalResponse)
async def remove_background(file: UploadFile = File(...)):
    """
    Remove background from uploaded image using AI
    """
    try:
        # Validate file type
        if file.content_type not in ["image/jpeg", "image/png", "image/jpg", "image/webp"]:
            raise HTTPException(
                status_code=400, 
                detail="Invalid file type. Only JPEG, PNG, and WebP are supported."
            )
        
        # Read file content
        contents = await file.read()
        
        # Validate file size (5MB limit)
        max_size = 5 * 1024 * 1024  # 5MB
        if len(contents) > max_size:
            raise HTTPException(
                status_code=400, 
                detail="File too large. Maximum size is 5MB."
            )
        
        # Process image with rembg
        try:
            # Remove background using rembg
            output_image = remove(contents)
            
            # Convert to base64
            image_base64 = base64.b64encode(output_image).decode('utf-8')
            
            return BackgroundRemovalResponse(
                success=True,
                image_base64=image_base64,
                original_filename=file.filename
            )
            
        except Exception as processing_error:
            logger.error(f"Image processing error: {str(processing_error)}")
            raise HTTPException(
                status_code=500,
                detail=f"Image processing failed: {str(processing_error)}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in remove_background: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while processing the image."
        )

@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "OK", 
        "service": "ClearCut AI Background Removal",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
