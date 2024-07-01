import datetime

import requests
from sqlalchemy import desc

from services.backend.models.database import database
from services.backend.models.users import vacancies_table
from services.backend.schemas import vacancies, users


async def search_vacancies_count(options: vacancies.SearchVacancies,
                                 current_user: users.User):
    params = {
        # "responses_count_enabled": True,
        "page": options.page,
        "text": f"{options.position} AND \"{options.skills}\" AND \"
        "per_page": options.per_page
    }

    if options.minimal_salary > 0:
        params["only_with_salary"] = True
        params["salary"] = options.minimal_salary

    result = requests.get("https://api.hh.ru/vacancies", params=params).json()

    if result["items"]:
        for item_index in range(len(result["items"])):
            if result["items"][item_index]["snippet"] and result["items"][item_index]["snippet"]["requirement"]:
                result["items"][item_index]["snippet"]["requirement"] = \
                    result["items"][item_index]["snippet"]["requirement"] \
                        .replace("<highlighttext>", "") \
                        .replace("</highlighttext>", "")

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
    return {**result, "vacancies_count": result["found"], "cofinders_count": 0}


async def get_vacancies_history(user_id: int):
    query = vacancies_table.select()\
        .where(vacancies_table.c.user_id == user_id)\
        .order_by(desc(vacancies_table.c.created_at)).limit(5)
    return await database.fetch_all(query)