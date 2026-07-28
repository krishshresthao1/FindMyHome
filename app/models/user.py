from pydantic import BaseModel, EmailStr
from typing import List


class User(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    phone: str
    role: str = "owner"
    favourites: List[str] = []