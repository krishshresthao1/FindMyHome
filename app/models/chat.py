from pydantic import BaseModel


class ChatMessage(BaseModel):
    receiver_id: str
    property_id: str | None = None
    message: str