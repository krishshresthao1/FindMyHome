from pydantic import BaseModel


class GoogleAuthSchema(BaseModel):
    credential: str