from fastapi import APIRouter, Depends
from app.utils.dependencies import get_current_user
from app.database.mongodb import property_collection

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/me")
async def get_profile(current_user=Depends(get_current_user)):

    posted_count = property_collection.count_documents(
        {
            "owner_email": current_user["email"]
        }
    )

    return {
        "_id": str(current_user["_id"]),
        "fullname": current_user["fullname"],
        "email": current_user["email"],
        "phone": current_user["phone"],
        "role": current_user["role"],
        "is_verified": current_user["is_verified"],
        "favourites": current_user.get("favourites", []),
        "properties_posted": posted_count,
    }