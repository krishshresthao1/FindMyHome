from pydantic import BaseModel
from typing import List, Optional


class Property(BaseModel):
    # Basic Information
    title: str
    location: str
    latitude: float
    longitude: float
    rent: int
    phone: str
    description: str

    # Images
    images: List[str] = []

    # Property Features
    bedrooms: int
    bathrooms: int
    kitchens: int
    parking: int

    furnished: bool = False
    balcony: bool = False

    # Accessibility
    road_type: str  # Blacktop / Gravel / Earthen

    # Nearby Facilities
    grocery_store: bool = False
    school: bool = False
    hospital: bool = False
    pharmacy: bool = False
    bus_stop: bool = False
    restaurant: bool = False
    park: bool = False
    gym: bool = False
    atm: bool = False

    # Owner Information
    owner_email: Optional[str] = None