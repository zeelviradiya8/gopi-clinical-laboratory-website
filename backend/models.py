from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
import uuid


class TestBooking(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    test_type: str
    preferred_date: str
    address: str
    notes: Optional[str] = ""
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "+91 98765 43210",
                "test_type": "Basic Health Checkup",
                "preferred_date": "2024-12-15",
                "address": "123 Main Street, City",
                "notes": "Morning slot preferred"
            }
        }


class TestBookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    test_type: str
    preferred_date: str
    address: str
    notes: Optional[str] = ""


class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "Jane Smith",
                "email": "jane@example.com",
                "phone": "+91 98765 43210",
                "message": "I would like to know more about your services"
            }
        }


class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str


class HealthPackage(BaseModel):
    id: int
    name: str
    description: str
    tests: List[str]
    price: int
    duration: str
    ideal_for: str

    class Config:
        json_schema_extra = {
            "example": {
                "id": 1,
                "name": "Basic Health Checkup",
                "description": "Essential tests for overall health monitoring",
                "tests": ["CBC", "Blood Sugar", "Lipid Profile"],
                "price": 1299,
                "duration": "6-8 hours",
                "ideal_for": "Adults (18-45 years)"
            }
        }
