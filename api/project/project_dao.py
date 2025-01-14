from flask import g

from api.project.project_model import Project
from utils import mylogger


def load_by_userid(user_id):
    g.db.execute("SELECT * FROM projects WHERE user_id=?", (user_id,))
    mylogger.debug(f"查询所有的项目 {user_id=}")
    result = g.db.fetchall()
    mylogger.debug(f"查询所有的项目 {result=}")

    return result


def save_projects(user_id, insertRecords, updateRecords, removeRecords):
    if insertRecords:
        for record in insertRecords:
            g.db.execute("INSERT INTO projects VALUES (:id, :name, :user_id)", (record['id'], record['name'], user_id))
            mylogger.debug(f"添加项目 {record=}")

    if updateRecords:
        for record in updateRecords:
            g.db.execute("UPDATE projects SET name=:name WHERE id=:id", (record['name'], record['id']))
            mylogger.debug(f"更新项目 {record=}")

    if removeRecords:
        for record in removeRecords:
            g.db.execute("DELETE FROM projects WHERE id=:id", (record['id'],))
            mylogger.debug(f"删除项目 {record=}")
    g.db.commit()


def add_project(project: Project) -> None:
    g.db.execute("INSERT INTO projects VALUES (:id, :name, :user_id)", project)

    g.db.commit()
    g.db.execute("SELECT * FROM projects WHERE id=?", (project.id,))
    project = g.db.cs.fetchone()
    mylogger.debug(f"添加项目 {project=}")
    return project


def update_project(project: Project) -> None:
    g.db.execute("UPDATE projects SET name=:name WHERE id=:id", (project.name, project.id))

    g.db.commit()
    g.db.execute("SELECT * FROM projects WHERE id=?", (project.id,))
    project = g.db.cs.fetchone()
    mylogger.debug(f"更新项目 {project=}")
    return project


def drop_project(project_id: str) -> None:
    g.db.execute("DELETE FROM projects WHERE id=:id", (project_id,))
    g.db.commit()
    mylogger.debug(f"丢弃项目 {project_id=}")
