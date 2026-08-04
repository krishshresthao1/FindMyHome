from fastapi import APIRouter, Depends, HTTPException
from app.utils.dependencies import get_current_user
from app.database.mongodb import users_collection, property_collection
from bson import ObjectId

router = APIRouter(
    prefix="/favourites",
    tags=["Favourites"]
)


# Get all favourite property ids
@router.get("/")
def get_favourites(current_user=Depends(get_current_user)):
    favourite_ids = current_user.get("favourites", [])

    object_ids = []
    valid_ids = []

    for pid in favourite_ids:
        try:
            object_ids.append(ObjectId(pid))
        except:
            pass

    if not object_ids:
        return []

    properties = list(
        property_collection.find(
            {"_id": {"$in": object_ids}}
        )
    )

    # Convert ObjectId -> string and build valid id list
    for property in properties:
        property["_id"] = str(property["_id"])
        valid_ids.append(property["_id"])

    # Remove deleted property ids from user's favourites
    if set(valid_ids) != set(favourite_ids):
        users_collection.update_one(
            {"_id": current_user["_id"]},
            {
                "$set": {
                    "favourites": valid_ids
                }
            }
        )

    return properties

# Toggle favourite
@router.post("/{property_id}")
def toggle_favourite(
    property_id: str,
    current_user=Depends(get_current_user)
):
    favourites = current_user.get("favourites", [])

    if property_id in favourites:
        users_collection.update_one(
            {"_id": current_user["_id"]},
            {
                "$pull": {
                    "favourites": property_id
                }
            }
        )

        return {
            "message": "Removed from favourites",
            "isFavourite": False
        }

    users_collection.update_one(
        {"_id": current_user["_id"]},
        {
            "$addToSet": {
                "favourites": property_id
            }
        }
    )

    return {
        "message": "Added to favourites",
        "isFavourite": True
    }