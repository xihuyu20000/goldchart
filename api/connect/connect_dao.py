from flask import g

from utils import mylogger


def load_by_userid(user_id):
    g.db.execute("SELECT * FROM connects WHERE user_id=?", (user_id,))
    mylogger.debug(f"查询所有的连接 {user_id=}")
    result = g.db.fetchall()
    mylogger.debug(f"查询所有的连接 {result=}")
    return result


def save_connects(user_id, insertRecords, updateRecords, removeRecords):
    if insertRecords:
        for record in insertRecords:
            g.db.execute("INSERT INTO connects(id, name, user_id, type, params) VALUES (:id, :name, :user_id, :type, :params)", (record['id'], record['name'], user_id, record['type'], record['params']))
            mylogger.debug(f"添加连接 {record=}")

    if updateRecords:
        for record in updateRecords:
            g.db.execute("UPDATE connects SET name=:name, type=:type, params=:params WHERE id=:id", (record['name'], record['type'], record['params'], record['id']))
            mylogger.debug(f"更新连接 {record=}")

    if removeRecords:
        for record in removeRecords:
            g.db.execute("DELETE FROM connects WHERE id=:id", (record['id'],))
            mylogger.debug(f"删除连接 {record=}")
    g.db.commit()