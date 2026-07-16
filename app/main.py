from fastapi import FastAPI
from app.routes.property import router as property_router
import app.database.mongodb
from app.routes import auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="FindMyHome API",
    version="1.0.0"
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