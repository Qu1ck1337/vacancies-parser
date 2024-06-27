import datetime
import json

import requests

from app.schemas import users
from app.models.database import database
from app.models.users import vacancies_table
from app.schemas import vacancies


async def search_vacancies_count(options: vacancies.SearchVacanciesOptions,
                                 current_user: users.User):
    params = {
        # "responses_count_enabled": True,
        "text": options.position,
        "only_with_salary": True,
        "salary": options.minimal_salary,
        "per_page": 0
    }

    result = requests.get("https://api.hh.ru/vacancies", params=params).json()
    # print(json.dumps(result, indent=4))

    query = (vacancies_table.insert().values(
        user_id=current_user.user_id,
        created_at=datetime.datetime.now(),
        position=options.position,
        skills=options.skills,
        work_format=options.work_format,
        minimal_salary=options.minimal_salary,
        vacancies_count=result["found"],
        cofinders_count=0
    ))
    await database.fetch_one(query)
    return {"vacancies_count": result["found"], "cofinders_count": 0}


async def get_vacancies_history(user_id: int):
    query = vacancies_table.select().where(vacancies_table.c.user_id == user_id)
    return await database.fetch_all(query)