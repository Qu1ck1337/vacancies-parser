from datetime import datetime
from typing import Optional
from pydantic import UUID4, BaseModel, EmailStr, Field, field_validator


class UserCreate(BaseModel):
    """ Проверяет sign-up запрос """
    email: EmailStr
    name: str
    password: str


class UserBase(BaseModel):
    """ Формирует тело ответа с деталями пользователя """
    id: int
    email: EmailStr
    name: str


class TokenBase(BaseModel):
    token: UUID4 = Field(..., alias="access_token")
    expires: datetime
    token_type: Optional[str] = "bearer"

    class Config:
        populate_by_name = True

    @field_validator("token")
    def hexlify_token(cls, value):
        """ Конвертирует UUID в hex строку """
        return value.hex


class User(UserBase):
    """ Формирует тело ответа с деталями пользователя и токеном """
    token: TokenBase = {}