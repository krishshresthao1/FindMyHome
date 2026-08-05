from pydantic import BaseModel
from datetime import datetime


class Conversation(BaseModel):
    owner_id: str
    tenant_id: str
    property_id: str

    last_message: str
    last_message_time: datetime

    created_at: datetime

class StartConversation(BaseModel):
    property_id: str