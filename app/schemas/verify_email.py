from pydantic import BaseModel


class VerifyEmailSchema(BaseModel):
    email: str
    code: str