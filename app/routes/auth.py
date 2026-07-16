from fastapi import APIRouter, HTTPException
from app.database.mongodb import users_collection
from app.models.user import User
from app.utils.hash import hash_password
from app.schemas.auth import LoginSchema
from app.utils.hash import verify_password
from app.utils.jwt_handler import create_access_token
from fastapi import Depends
from app.utils.dependencies import get_current_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register", status_code=201)
def register(user: User):

    existing = users_collection.find_one(
        {
            "email": user.email
        }
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    user.password = hash_password(user.password)

    users_collection.insert_one(
        user.model_dump()
    )

    return {
        "message": "Registration Successful"
    }




@router.post("/login")
def login(login_data: LoginSchema):

    user = users_collection.find_one(
        {
            "email": login_data.email
        }
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user["password"]
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    token = create_access_token(
        {
            "email": user["email"],
            "role": user["role"]
        }
    )

    return {

        "access_token": token,

        "token_type": "bearer"
    }

@router.get("/me")
def get_profile(
    current_user = Depends(get_current_user)
):

    current_user["_id"] = str(current_user["_id"])

    del current_user["password"]

    return current_user