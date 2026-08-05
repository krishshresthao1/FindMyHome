from pydantic import BaseModel


class ChatMessage(BaseModel):
    receiver_id: str
    property_id: str | None = None
    message: str

class PropertyMessage(BaseModel):
    property_id: str
    conversation_id: str