from pydantic import BaseModel, EmailStr


class User(BaseModel):
    fullname: str
    email: EmailStr
    password: str
    phone: str
    role: str = "owner"