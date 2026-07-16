from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database.mongodb import users_collection
from app.utils.jwt_handler import verify_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    payload = verify_token(token)

    if payload is None:

        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    user = users_collection.find_one(
        {
            "email": payload["email"]
        }
    )

    if user is None:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user