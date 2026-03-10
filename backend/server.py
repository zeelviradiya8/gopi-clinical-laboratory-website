from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List
from models import (
    TestBooking,
    TestBookingCreate,
    ContactInquiry,
    ContactInquiryCreate,
    HealthPackage
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Gopi Clinical Laboratory API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Gopi Clinical Laboratory API is running"}


# Test Booking Endpoints
@api_router.post("/bookings", response_model=TestBooking)
async def create_booking(booking_data: TestBookingCreate):
    """Create a new test booking"""
    try:
        booking_obj = TestBooking(**booking_data.dict())
        booking_dict = booking_obj.dict()
        booking_dict['created_at'] = booking_dict['created_at'].isoformat()
        await db.test_bookings.insert_one(booking_dict)
        return booking_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create booking: {str(e)}")


@api_router.get("/bookings", response_model=List[TestBooking])
async def get_bookings():
    """Get all test bookings"""
    try:
        bookings = await db.test_bookings.find({}, {"_id": 0}).to_list(1000)
        return [TestBooking(**booking) for booking in bookings]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch bookings: {str(e)}")


@api_router.get("/bookings/{booking_id}", response_model=TestBooking)
async def get_booking(booking_id: str):
    """Get a specific booking by ID"""
    try:
        booking = await db.test_bookings.find_one({"id": booking_id}, {"_id": 0})
        if not booking:
            raise HTTPException(status_code=404, detail="Booking not found")
        return TestBooking(**booking)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch booking: {str(e)}")


# Contact Inquiry Endpoints
@api_router.post("/contacts", response_model=ContactInquiry)
async def create_contact(contact_data: ContactInquiryCreate):
    """Create a new contact inquiry"""
    try:
        contact_obj = ContactInquiry(**contact_data.dict())
        contact_dict = contact_obj.dict()
        contact_dict['created_at'] = contact_dict['created_at'].isoformat()
        await db.contact_inquiries.insert_one(contact_dict)
        return contact_obj
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create contact inquiry: {str(e)}")


@api_router.get("/contacts", response_model=List[ContactInquiry])
async def get_contacts():
    """Get all contact inquiries"""
    try:
        contacts = await db.contact_inquiries.find({}, {"_id": 0}).to_list(1000)
        return [ContactInquiry(**contact) for contact in contacts]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch contacts: {str(e)}")


# Health Packages Endpoints
@api_router.get("/packages", response_model=List[HealthPackage])
async def get_packages():
    """Get all health packages"""
    try:
        # Check if packages exist in database
        packages = await db.health_packages.find({}, {"_id": 0}).to_list(100)
        
        # If no packages in DB, initialize with default data
        if not packages:
            default_packages = [
                {
                    "id": 1,
                    "name": "Basic Health Checkup",
                    "description": "Essential tests for overall health monitoring",
                    "tests": ["Complete Blood Count (CBC)", "Blood Sugar (Fasting)", "Lipid Profile", "Kidney Function Test", "Liver Function Test"],
                    "price": 1299,
                    "duration": "6-8 hours",
                    "ideal_for": "Adults (18-45 years)"
                },
                {
                    "id": 2,
                    "name": "Senior Citizen Package",
                    "description": "Comprehensive health screening for elderly",
                    "tests": ["Complete Blood Count", "HbA1c", "Lipid Profile", "Kidney & Liver Function", "Thyroid Profile", "Vitamin D", "Vitamin B12", "ECG"],
                    "price": 2499,
                    "duration": "8-12 hours",
                    "ideal_for": "Adults above 60 years"
                },
                {
                    "id": 3,
                    "name": "Pre-Employment Package",
                    "description": "Standard medical tests for job requirements",
                    "tests": ["CBC", "Blood Group", "HIV Test", "HBsAg", "Chest X-Ray", "Urine Routine"],
                    "price": 899,
                    "duration": "4-6 hours",
                    "ideal_for": "Job applicants"
                },
                {
                    "id": 4,
                    "name": "Diabetes Care Package",
                    "description": "Specialized tests for diabetes monitoring",
                    "tests": ["HbA1c", "Fasting Blood Sugar", "Post Prandial Blood Sugar", "Kidney Function Test", "Lipid Profile", "Urine Microalbumin"],
                    "price": 1599,
                    "duration": "6-8 hours",
                    "ideal_for": "Diabetic patients"
                },
                {
                    "id": 5,
                    "name": "Women's Wellness Package",
                    "description": "Complete health screening for women",
                    "tests": ["CBC", "Thyroid Profile", "Vitamin D", "Vitamin B12", "Iron Studies", "Hormone Panel", "Pap Smear"],
                    "price": 2199,
                    "duration": "8-10 hours",
                    "ideal_for": "Women (25-55 years)"
                },
                {
                    "id": 6,
                    "name": "Executive Health Package",
                    "description": "Comprehensive checkup for busy professionals",
                    "tests": ["Complete Blood Count", "Lipid Profile", "Liver & Kidney Function", "Thyroid Profile", "HbA1c", "Vitamin D", "ECG", "Chest X-Ray", "Stress Test"],
                    "price": 3499,
                    "duration": "12-24 hours",
                    "ideal_for": "Working professionals"
                }
            ]
            await db.health_packages.insert_many(default_packages)
            packages = default_packages
        
        return [HealthPackage(**package) for package in packages]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch packages: {str(e)}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
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
