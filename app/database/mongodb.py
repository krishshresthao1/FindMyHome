from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(os.getenv("MONGO_URI"))

# Force a connection test
client.admin.command("ping")

print("Successfully connected to MongoDB!")

db = client["FindMyHome"]

property_collection = db["properties"]
users_collection = db["users"]

chat_collection = db["chat"]