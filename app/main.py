from fastapi import FastAPI
from app.routes.property import router as property_router
import app.database.mongodb
from app.routes import auth, chat, chat_v2
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.routes import favourites
from app.routes.user import router as user_router

app = FastAPI(
    title="FindMyHome API",
    version="1.0.0"
)

app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

app.include_router(property_router)


app.include_router(auth.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(favourites.router)

app.include_router(user_router)

app.include_router(chat.router)

app.include_router(chat_v2.router)