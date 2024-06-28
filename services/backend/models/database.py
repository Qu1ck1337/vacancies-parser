import os

import databases
from dotenv import load_dotenv

load_dotenv()


DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")

TESTING = os.getenv("TESTING")

print(DB_USER)
print(DB_PASSWORD)
print(DB_HOST)


if TESTING:
    # Use separate DB for tests
    DB_NAME = "Parser" # "async-blogs-temp-for-test"
    TEST_SQLALCHEMY_DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"
    )
    database = databases.Database(TEST_SQLALCHEMY_DATABASE_URL)
    print("Connection successful")
else:
    DB_NAME = "Parser" # "async-blogs"
    SQLALCHEMY_DATABASE_URL = (
        f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:5432/{DB_NAME}"
    )
    database = databases.Database(SQLALCHEMY_DATABASE_URL)
    print("Connection successful")