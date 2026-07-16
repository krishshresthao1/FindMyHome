from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId

from app.models.property import Property
from app.database.mongodb import property_collection
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/properties",
    tags=["Properties"]
)

@router.get("/getProperty")
def get_properties():
    properties = list(property_collection.find())

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
    property: Property,
    current_user=Depends(get_current_user)
):

    property_data = property.model_dump()

    property_data["owner_id"] = str(current_user["_id"])
    property_data["owner_name"] = current_user["fullname"]
    property_data["owner_email"] = current_user["email"]

    property_collection.insert_one(property_data)

    return {
        "message": "Property added successfully",
        "property": property_data
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