from fastapi import APIRouter, Depends
from bson import ObjectId
from datetime import datetime

from app.models.chat import (
    ChatMessage,
    PropertyMessage
)
from app.models.conversation import StartConversation
from app.utils.dependencies import get_current_user
from app.database.mongodb import (
    conversation_collection,
    message_collection,
    users_collection,
    property_collection,
)

from fastapi import HTTPException

router = APIRouter(
    prefix="/chat-v2",
    tags=["Chat V2"]
)

# Start or get existing conversation
@router.post("/start")
def start_conversation(
    data: StartConversation,
    current_user=Depends(get_current_user)
):
    tenant_id = str(current_user["_id"])

    property_doc = property_collection.find_one(
        {
            "_id": ObjectId(data.property_id)
        }
    )

    if property_doc is None:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    owner_id = property_doc["owner_id"]


    # Check existing conversation
    conversation = conversation_collection.find_one(
        {
            "property_id": data.property_id,
            "owner_id": owner_id,
            "tenant_id": tenant_id,
        }
    )


    # Already exists
    if conversation:
        return {
            "conversation_id": str(conversation["_id"]),
            "is_new": False
        }


    # Create new conversation
    new_conversation = {
        "property_id": data.property_id,
        "owner_id": owner_id,
        "tenant_id": tenant_id,
        "last_message": "",
        "last_message_time": datetime.utcnow(),
        "created_at": datetime.utcnow(),
    }


    result = conversation_collection.insert_one(
        new_conversation
    )


    return {
        "conversation_id": str(result.inserted_id),
        "is_new": True
    }

# Send a message
@router.post("/send")
def send_message(
    chat: ChatMessage,
    current_user=Depends(get_current_user)
):
    sender_id = str(current_user["_id"])
    receiver_id = chat.receiver_id

    # Find property
    property_doc = property_collection.find_one(
        {
            "_id": ObjectId(chat.property_id)
        }
    )

    if property_doc is None:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )

    owner_id = property_doc["owner_id"]

    # Determine tenant
    if sender_id == owner_id:
        tenant_id = receiver_id
    else:
        tenant_id = sender_id

    # Find existing conversation
    conversation = conversation_collection.find_one(
        {
            "property_id": chat.property_id,
            "owner_id": owner_id,
            "tenant_id": tenant_id,
        }
    )

    # Create conversation if necessary
    if conversation is None:

        conversation = {
            "property_id": chat.property_id,
            "owner_id": owner_id,
            "tenant_id": tenant_id,
            "last_message": chat.message,
            "last_message_time": datetime.utcnow(),
            "created_at": datetime.utcnow(),
        }

        conversation_result = conversation_collection.insert_one(
            conversation
        )

        conversation_id = str(conversation_result.inserted_id)

    else:

        conversation_id = str(conversation["_id"])

        conversation_collection.update_one(
            {
                "_id": conversation["_id"]
            },
            {
                "$set": {
                    "last_message": chat.message,
                    "last_message_time": datetime.utcnow()
                }
            }
        )

    # Save message
    message = {
        "conversation_id": conversation_id,
        "sender_id": sender_id,

        "type": "text",

        "message": chat.message,

        "seen": False,

        "created_at": datetime.utcnow(),
    }

    result = message_collection.insert_one(message)

    message["_id"] = str(result.inserted_id)

    return {
    "conversation_id": conversation_id,
    "message": message
}


@router.post("/send-property")
def send_property_message(
    data: PropertyMessage,
    current_user=Depends(get_current_user)
):

    property_doc = property_collection.find_one(
        {
            "_id": ObjectId(data.property_id)
        }
    )


    if property_doc is None:
        raise HTTPException(
            status_code=404,
            detail="Property not found"
        )


    message = {

        "conversation_id": data.conversation_id,

        "sender_id": str(current_user["_id"]),

        "type": "property",

        "property": {

            "id": data.property_id,

            "title": property_doc["title"],

            "image": property_doc["images"][0]
            if property_doc.get("images")
            else None,

            "location": property_doc["location"],

            "rent": property_doc["rent"]

        },

        "message":
        "Interested in this property",

        "seen": False,

        "created_at": datetime.utcnow()

    }


    result = message_collection.insert_one(message)


    message["_id"] = str(result.inserted_id)


    return message
# Get chat history between two users
@router.get("/messages/{conversation_id}")
def get_messages(
    conversation_id: str,
    current_user=Depends(get_current_user)
):
    current_id = str(current_user["_id"])

    # Verify conversation exists
    conversation = conversation_collection.find_one(
        {
            "_id": ObjectId(conversation_id)
        }
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    # Security check
    if (
        conversation["owner_id"] != current_id
        and conversation["tenant_id"] != current_id
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    messages = list(
        message_collection.find(
            {
                "conversation_id": conversation_id
            }
        ).sort("created_at", 1)
    )

    for message in messages:
        message["_id"] = str(message["_id"])

    return messages

@router.put("/seen/{conversation_id}")
def mark_messages_seen(
    conversation_id: str,
    current_user=Depends(get_current_user)
):
    current_id = str(current_user["_id"])

    # Verify conversation exists
    conversation = conversation_collection.find_one(
        {
            "_id": ObjectId(conversation_id)
        }
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found"
        )

    # Verify current user belongs to conversation
    if (
        conversation["owner_id"] != current_id
        and conversation["tenant_id"] != current_id
    ):
        raise HTTPException(
            status_code=403,
            detail="Not authorized"
        )

    # Mark only OTHER user's messages as seen
    result = message_collection.update_many(
        {
            "conversation_id": conversation_id,
            "sender_id": {
                "$ne": current_id
            },
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

    # Get all conversations where current user is owner or tenant
    conversations = list(
        conversation_collection.find(
            {
                "$or": [
                    {"owner_id": current_id},
                    {"tenant_id": current_id},
                ]
            }
        ).sort("last_message_time", -1)
    )

    results = []

    for conversation in conversations:

        # Find the other participant
        if conversation["owner_id"] == current_id:
            other_user_id = conversation["tenant_id"]
        else:
            other_user_id = conversation["owner_id"]

        user = users_collection.find_one(
            {
                "_id": ObjectId(other_user_id)
            }
        )

        property_doc = property_collection.find_one(
            {
                "_id": ObjectId(conversation["property_id"])
            }
        )

        results.append({
            "conversation_id": str(conversation["_id"]),
            "user_id": other_user_id,
            "name": user["fullname"] if user else "User",
            "property_id": conversation["property_id"],
            "property_title": property_doc["title"] if property_doc else "Property",
            "last_message": conversation["last_message"],
            "time": conversation["last_message_time"],
        })

    return results