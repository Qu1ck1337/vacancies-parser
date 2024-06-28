from contextlib import asynccontextmanager

import uvicorn
from services.backend.models.database import database
from services.backend.routers import users, vacancies
from fastapi import FastAPI


app = FastAPI()


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