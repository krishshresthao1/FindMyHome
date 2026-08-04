from fastapi import APIRouter, Depends
from bson import ObjectId
from datetime import datetime

from app.models.chat import ChatMessage
from app.utils.dependencies import get_current_user
from app.database.mongodb import chat_collection, users_collection


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


# Send a message
@router.post("/send")
def send_message(
    chat: ChatMessage,
    current_user=Depends(get_current_user)
):
    message = {
    "sender_id": str(current_user["_id"]),
    "receiver_id": chat.receiver_id,
    "property_id": chat.property_id,
    "message": chat.message,
    "created_at": datetime.utcnow(),
    "seen": False,
}

    result = chat_collection.insert_one(message)

    message["_id"] = str(result.inserted_id)

    return message


# Get chat history between two users
@router.get("/messages/{user_id}")
def get_messages(
    user_id: str,
    current_user=Depends(get_current_user)
):
    current_id = str(current_user["_id"])

    messages = list(
        chat_collection.find({
            "$or": [
                {
                    "sender_id": current_id,
                    "receiver_id": user_id,
                },
                {
                    "sender_id": user_id,
                    "receiver_id": current_id,
                },
            ]
        }).sort("created_at", 1)
    )

    for message in messages:
        message["_id"] = str(message["_id"])

    return messages

@router.put("/seen/{sender_id}")
def mark_messages_seen(
    sender_id: str,
    current_user=Depends(get_current_user)
):
    current_id = str(current_user["_id"])

    result = chat_collection.update_many(
        {
            "sender_id": sender_id,
            "receiver_id": current_id,
            "seen": False,
        },
        {
            "$set": {
                "seen": True
            }
        }
    )

    return {
        "message": "Messages marked as seen",
        "updated": result.modified_count
    }


@router.get("/conversations")
def get_conversations(
    current_user=Depends(get_current_user)
):

    current_id = str(current_user["_id"])

    messages = list(
        chat_collection.find({
            "$or": [
                {
                    "receiver_id": current_id
                },
                {
                    "sender_id": current_id
                }
            ]
        })
        .sort("created_at", -1)
    )

    users = {}

    for msg in messages:

        if msg["sender_id"] == current_id:
            other_user = msg["receiver_id"]
        else:
            other_user = msg["sender_id"]


        if other_user not in users:

            user = users_collection.find_one(
                {
                    "_id": ObjectId(other_user)
                }
            )

            users[other_user] = {
                "user_id": other_user,
                "name": (
                    user.get("fullname")
                    or user.get("name")
                    or "User"
                ) if user else "User",
                "email": user.get("email", "") if user else "",
                "role": user.get("role", "") if user else "",
                "last_message": msg["message"],
                "time": msg["created_at"]
            }


    return list(users.values())