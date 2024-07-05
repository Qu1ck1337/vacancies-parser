# Vacancies Parser

## Description

This application is a vacancies parser developed using FastAPI for the backend and React for the frontend. The application collects job vacancies from hh.ru.

## Functional Requirements

- Parsing job vacancies from various sources.
- Storing data in a database.
- Interface for viewing and filtering job vacancies.
- User registration and authentication.
- Admin panel for managing data.

## Installation

### Requirements

- Python 3.11.5
- Node.js
- Docker

### Installation Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/vacancies-parser.git
    ```

2. Set up environment variables:
    Create a `.env` file at the project root and add the following variables:
    ```env
    DB_USER=user
    DB_PASS=pass
    DB_HOST=localhost
    DB_NAME=Parser
    TESTING=True
    ```

3. Run Docker-compose to set up the database and migrations:
    ```sh
    docker-compose up --build
    ```

4. Install backend dependencies:
    ```sh
    cd services/backend
    pip install -r requirements.txt
    ```

5. Install frontend dependencies:
    ```sh
    cd services/frontend
    npm install
    ```

## Running the Application

### Running the backend

1. Navigate to the backend directory:
    ```sh
    cd services/backend
    ```

2. Run the application:
    ```sh
    uvicorn main:app --reload
    ```

### Running the frontend

1. Navigate to the frontend directory:
    ```sh
    cd services/frontend
    ```

2. Run the application:
    ```sh
    npm start
    ```

## Testing

### Running backend tests

1. Navigate to the tests directory:
    ```sh
    cd services/backend/tests
    ```

2. Run the tests using pytest:
    ```sh
    pytest
    ```

---

# Vacancies Parser

## Описание

Это приложение представляет собой парсер вакансий, разработанный с использованием FastAPI на backend и React на frontend. Приложение позволяет собирать вакансии с сайта hh.ru.

## Функциональные требования

- Парсинг вакансий с различных источников.
- Сохранение данных в базе данных.
- Интерфейс для просмотра и фильтрации вакансий.
- Регистрация и аутентификация пользователей.
- Административная панель для управления данными.

## Установка

### Требования

- Python 3.11.5
- Node.js
- Docker

### Шаги установки

1. Клонируйте репозиторий:
    ```sh
    git clone https://github.com/yourusername/vacancies-parser.git
    ```

2. Настройте переменные окружения:
    Создайте файл `.env` в корне проекта и добавьте следующие переменные:
    ```env
    DB_USER=user
    DB_PASS=pass
    DB_HOST=localhost
    DB_NAME=Parser
    TESTING=True
    ```

3. Запустите Docker-compose для настройки базы данных и миграций:
    ```sh
    docker-compose up --build
    ```

4. Установите зависимости для backend:
    ```sh
    cd services/backend
    pip install -r requirements.txt
    ```

5. Установите зависимости для frontend:
    ```sh
    cd services/frontend
    npm install
    ```

## Запуск приложения

### Запуск backend

1. Перейдите в директорию backend:
    ```sh
    cd services/backend
    ```

2. Запустите приложение:
    ```sh
    uvicorn main:app --reload
    ```

### Запуск frontend

1. Перейдите в директорию frontend:
    ```sh
    cd services/frontend
    ```

2. Запустите приложение:
    ```sh
    npm start
    ```

## Тестирование

### Запуск тестов backend

1. Перейдите в директорию с тестами:
    ```sh
    cd services/backend/tests
    ```

2. Запустите тесты с помощью pytest:
    ```sh
    pytest
    ```
