from contextlib import asynccontextmanager

import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from models.database import database
from routers import users, vacancies
from fastapi import FastAPI


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await database.connect()
    yield
    await database.disconnect()

app.router.lifespan_context = lifespan

app.include_router(users.router)
app.include_router(vacancies.router)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)