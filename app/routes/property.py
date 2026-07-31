from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.models.property import Property
from app.database.mongodb import property_collection
from app.utils.dependencies import get_current_user

from fastapi import UploadFile, File, Form
from typing import List

from pathlib import Path

from fastapi import UploadFile, File, Form, Query
import uuid


router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)

@router.get("/")
def get_properties(
    location: str = Query(None),
    property_type: str = Query(None),
    min_price: int = Query(None),
    max_price: int = Query(None)
):
    query = {}

    # Location filter
    if location and location != "Anywhere":
        query["location"] = location

    # Property type filter
    if property_type and property_type != "All Types":
        query["property_type"] = property_type

    # Minimum rent filter
    if min_price:
        query["rent"] = {
            "$gte": min_price
        }

    # Maximum rent filter
    if max_price:
        if "rent" in query:
            query["rent"]["$lte"] = max_price
        else:
            query["rent"] = {
                "$lte": max_price
            }

    properties = list(
        property_collection.find(query)
    )

    for property in properties:
        property["_id"] = str(property["_id"])

    return properties

@router.get("/{property_id}")
def get_property(property_id: str):

    property = property_collection.find_one(
        {"_id": ObjectId(property_id)}
    )

    if not property:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    property["_id"] = str(property["_id"])

    return property

@router.post("/")
def post_property(
    title: str = Form(...),
    location: str = Form(...),
    latitude: float = Form(0),
    longitude: float = Form(0),
    rent: int = Form(...),
    phone: str = Form(...),
    description: str = Form(...),

    property_type: str = Form(...),

    bedrooms: int = Form(0),
    bathrooms: int = Form(0),
    kitchens: int = Form(0),
    parking: int = Form(0),

    furnished: bool = Form(False),
    balcony: bool = Form(False),
    road_connectivity: bool = Form(False),

    grocery_store: bool = Form(False),
    school: bool = Form(False),
    hospital: bool = Form(False),
    pharmacy: bool = Form(False),
    bus_stop: bool = Form(False),
    restaurant: bool = Form(False),
    park: bool = Form(False),
    gym: bool = Form(False),
    atm: bool = Form(False),

    images: List[UploadFile] = File(...),

    current_user=Depends(get_current_user)

    
):
    if len(images) > 10:
        raise HTTPException(
            status_code=400,
            detail="Maximum 10 images allowed"
        )
    # create property id folder
    property_id = str(uuid.uuid4())

    upload_dir = Path(
        f"app/uploads/properties/{property_id}"
    )

    upload_dir.mkdir(
        parents=True,
        exist_ok=True
    )

    image_paths = []


    # save images
    for image in images:

        if image.content_type not in [
            "image/jpeg",
            "image/png",
            "image/webp"
        ]:
            raise HTTPException(
                status_code=400,
                detail="Only JPG, PNG and WEBP images are allowed"
            )

        unique_filename = f"{uuid.uuid4()}_{image.filename}"

        file_path = upload_dir / unique_filename

        with open(file_path, "wb") as buffer:
            buffer.write(image.file.read())


        image_paths.append(
        f"/uploads/properties/{property_id}/{unique_filename}"
    )


    property_data = {
        "title": title,
        "location": location,
        "latitude": latitude,
        "longitude": longitude,
        "rent": rent,
        "phone": phone,
        "description": description,

        "property_type": property_type,

        "images": image_paths,

        "bedrooms": bedrooms,
        "bathrooms": bathrooms,
        "kitchens": kitchens,
        "parking": parking,

        "furnished": furnished,
        "balcony": balcony,
        "road_connectivity": road_connectivity,

        "grocery_store": grocery_store,
        "school": school,
        "hospital": hospital,
        "pharmacy": pharmacy,
        "bus_stop": bus_stop,
        "restaurant": restaurant,
        "park": park,
        "gym": gym,
        "atm": atm,

        "owner_id": str(current_user["_id"]),
        "owner_name": current_user["fullname"],
        "owner_email": current_user["email"]
    }


    result = property_collection.insert_one(property_data)


    return {
        "message": "Property added successfully",
        "property_id": str(result.inserted_id)
    }

@router.put("/updateProperty/{property_id}")
def update_property(property_id: str, updated_property: Property):

    result = property_collection.update_one(
        {"_id": ObjectId(property_id)},
        {"$set": updated_property.model_dump()}
    )

    if result.modified_count == 1:
        return {"message": "Property updated successfully"}

    return {"message": "Property not found or no changes made"}

@router.delete("/deleteProperty/{property_id}")
def delete_property(property_id: str):

    result = property_collection.delete_one(
        {"_id": ObjectId(property_id)}
    )

    if result.deleted_count == 1:
        return {"message": "Property deleted successfully"}

    return {"message": "Property not found"}