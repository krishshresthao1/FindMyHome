from pydantic import BaseModel
from datetime import datetime


class Message(BaseModel):
    conversation_id: str
    sender_id: str

    message: str

    seen: bool = False

    created_at: datetime