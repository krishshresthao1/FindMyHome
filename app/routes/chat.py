from fastapi import APIRouter, Depends
from bson import ObjectId
from datetime import datetime

from app.models.chat import ChatMessage
from app.utils.dependencies import get_current_user
from app.database.mongodb import (
    conversation_collection,
    message_collection,
    users_collection,
    property_collection,
)

from app.models.conversation import Conversation
from app.models.message import Message

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

    sender_id = str(current_user["_id"])
    receiver_id = chat.receiver_id

    # Find property
    property = property_collection.find_one(
        {
            "_id": ObjectId(chat.property_id)
        }
    )

    if not property:
        return {
            "message": "Property not found"
        }

    owner_id = property["owner_id"]
    tenant_id = sender_id if sender_id != owner_id else receiver_id

    # Check if conversation already exists
    conversation = conversation_collection.find_one(
        {
            "property_id": chat.property_id,
            "owner_id": owner_id,
            "tenant_id": tenant_id,
        }
    )

    # Create conversation if it doesn't exist
    if not conversation:

        conversation = {
            "property_id": chat.property_id,
            "owner_id": owner_id,
            "tenant_id": tenant_id,
            "last_message": chat.message,
            "last_message_time": datetime.utcnow(),
            "created_at": datetime.utcnow(),
        }

        conversation_id = conversation_collection.insert_one(
            conversation
        ).inserted_id

    else:

        conversation_id = conversation["_id"]

        conversation_collection.update_one(
            {
                "_id": conversation_id
            },
            {
                "$set": {
                    "last_message": chat.message,
                    "last_message_time": datetime.utcnow(),
                }
            }
        )

    # Save message
    message = {
        "conversation_id": str(conversation_id),
        "sender_id": sender_id,
        "message": chat.message,
        "seen": False,
        "created_at": datetime.utcnow(),
    }

    result = message_collection.insert_one(message)

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