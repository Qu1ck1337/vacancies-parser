# Используем официальный образ PostgreSQL
FROM postgres:latest

# Копируем наш скрипт инициализации в папку /docker-entrypoint-initdb.d/ внутри контейнера
COPY init.sql /docker-entrypoint-initdb.d/

# Это действие будет выполнено при первом запуске контейнера