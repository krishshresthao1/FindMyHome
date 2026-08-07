from fastapi import APIRouter, HTTPException
from app.database.mongodb import users_collection
from app.models.user import User
from app.utils.hash import hash_password
from app.schemas.auth import LoginSchema
from app.utils.hash import verify_password
from app.utils.jwt_handler import create_access_token
from fastapi import Depends
from app.utils.dependencies import get_current_user

from app.schemas.google_auth import GoogleAuthSchema
from google.oauth2 import id_token
from google.auth.transport import requests
import os

import random
from datetime import datetime, timedelta

from app.utils.email_sender import send_verification_email

from app.schemas.verify_email import VerifyEmailSchema

from datetime import datetime, timedelta
import random
from app.utils.email_sender import send_verification_email


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

    otp = str(random.randint(100000, 999999))

    expiry = datetime.utcnow() + timedelta(minutes=5)

    user.password = hash_password(user.password)

    user_data = user.model_dump()

    user_data["is_verified"] = False
    user_data["verification_code"] = otp
    user_data["verification_expiry"] = expiry

    users_collection.insert_one(user_data)

    try:
        send_verification_email(
            user.email,
            otp
        )
    except Exception as e:
        print("Email sending failed:", e)

    return {
    "message": "Verify your email. Verification code sent to your email."
}

@router.post("/verify-email")
def verify_email(data: VerifyEmailSchema):

    user = users_collection.find_one(
        {
            "email": data.email
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user["is_verified"]:
        return {
            "message": "Email already verified"
        }

    if datetime.utcnow() > user["verification_expiry"]:
        raise HTTPException(
            status_code=400,
            detail="Verification code expired"
        )

    if data.code != user["verification_code"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid verification code"
        )

    users_collection.update_one(
        {
            "email": data.email
        },
        {
            "$set": {
                "is_verified": True
            },
            "$unset": {
                "verification_code": "",
                "verification_expiry": ""
            }
        }
    )

    return {
        "message": "Email verified successfully"
    }

@router.post("/resend-otp")
def resend_otp(email: str):

    user = users_collection.find_one(
        {
            "email": email
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.get("is_verified", False):
        raise HTTPException(
            status_code=400,
            detail="Email is already verified"
        )

    otp = str(random.randint(100000, 999999))

    expiry = datetime.utcnow() + timedelta(minutes=5)

    users_collection.update_one(
        {
            "email": email
        },
        {
            "$set": {
                "verification_code": otp,
                "verification_expiry": expiry
            }
        }
    )

    send_verification_email(email, otp)

    return {
        "message": "Verification code sent successfully."
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

    if not user["is_verified"]:
        raise HTTPException(
            status_code=403,
            detail="Please verify your email first."
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
            "role": user["role"],
            
        }
    )

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {
            "_id": str(user["_id"]),
            "name": user.get("fullname", ""),
            "email": user["email"],
            "role": user["role"]
        } 
    }

@router.post("/google")
def google_login(data: GoogleAuthSchema):

    try:
        idinfo = id_token.verify_oauth2_token(
            data.credential,
            requests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )

    except Exception as e:
        print("GOOGLE LOGIN ERROR:", e)

        raise HTTPException(
            status_code=401,
            detail=str(e)
        )

    email = idinfo["email"]

    fullname = idinfo.get("name", "")

    user = users_collection.find_one(
        {
            "email": email
        }
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not registered"
        )

    token = create_access_token(

        {
            "email": user["email"],
            "role": user["role"]
        }

    )

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {
            "_id": str(user["_id"]),
            "name": user.get("fullname", ""),
            "email": user["email"],
            "role": user["role"]
        }
        
    }

@router.get("/me")
def get_profile(
    current_user = Depends(get_current_user)
):

    current_user["_id"] = str(current_user["_id"])

    del current_user["password"]

    return current_user