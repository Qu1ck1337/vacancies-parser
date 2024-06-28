import sqlalchemy

metadata = sqlalchemy.MetaData()


users_table = sqlalchemy.Table(
    "vacancies_history",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("user_id", sqlalchemy.ForeignKey("users.id")),
    sqlalchemy.Column("date", sqlalchemy.DateTime()),
    sqlalchemy.Column("position", sqlalchemy.String()),
    sqlalchemy.Column("skills", sqlalchemy.String()),
    sqlalchemy.Column("work_format", sqlalchemy.String()),
    sqlalchemy.Column("minimal_salary", sqlalchemy.Integer()),
    sqlalchemy.Column("vacancies_count", sqlalchemy.Integer()),
    sqlalchemy.Column("cofinders_count", sqlalchemy.Integer())
)