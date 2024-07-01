from datetime import datetime
from pydantic import BaseModel


class SearchVacanciesOptions(BaseModel):
    """Тело запроса на поиск вакансий"""
    position: str | None = None
    skills: str | None = None
    work_format: str | None = None
    minimal_salary: int = 0


class SearchVacancies(SearchVacanciesOptions):
    page: int = 0
    per_page: int = 10


class VacanciesBase(BaseModel):
    """Формирует тело ответа по количеству вакансий и соискателей"""
    items: list
    page: int
    pages: int
    vacancies_count: int
    cofinders_count: int


class VacanciesHistory(SearchVacanciesOptions):
    """Формирует тело истории вакансий"""
    created_at: datetime
    vacancies_count: int
    cofinders_count: int