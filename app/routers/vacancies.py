from typing import List

from app.schemas import users, vacancies
from app.schemas.vacancies import VacanciesBase, VacanciesHistory
from app.utils.dependencies import get_current_user
from fastapi import APIRouter, Depends

from app.utils import vacancies as vacancies_utils

router = APIRouter()


@router.post("/search_vacancies", response_model=VacanciesBase)
async def search_vacancies(options: vacancies.SearchVacanciesOptions,
                           current_user: users.User = Depends(get_current_user)):
    return await vacancies_utils.search_vacancies_count(options, current_user)


@router.get("/vacancies_history", response_model=List[VacanciesHistory])
async def vacancies_history(current_user: users.User = Depends(get_current_user)):
    records = await vacancies_utils.get_vacancies_history(current_user.user_id)
    return [VacanciesHistory(**record) for record in records]