import uvicorn
from fastapi import FastAPI
import requests


app = FastAPI()  # noqa: pylint=invalid-name


@app.get("/search")
async def search():
    params = {
        "text": "python",
        "only_with_salary": True,
        "salary": 1000000,
        "per_page": 0
    }

    result = requests.get("https://api.hh.ru/vacancies", params=params)
    return result.json()


uvicorn.run(app)