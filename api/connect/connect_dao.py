from flask import g


from utils import mylogger, uuidid


def load_by_userid(user_id):
    g.db.execute("SELECT * FROM connects WHERE user_id=?", (user_id,))
    mylogger.debug(f"查询所有的连接 {user_id=}")
    result = g.db.fetchall()
    mylogger.debug(f"查询所有的连接 {result=}")
    return result


def delete_by(connect_id):
    g.db.execute("DELETE FROM connects WHERE id=:id", (connect_id,))
    g.db.commit()


def save_connects(connect):
    if connect['id'].strip() == '':
        connect['id'] = f'connect_{uuidid()}'
        g.db.execute("INSERT INTO connects(id, user_id, name, type, params) VALUES (:id, :user_id, :name, :type, :params)", (connect['id'], connect['user_id'], connect['name'], connect['type'], connect['params']))
        mylogger.debug(f"添加连接 {connect=}")
    else:
        g.db.execute("UPDATE connects SET name=:name, type=:type, params=:params WHERE id=:id", (connect['name'], connect['type'], connect['params'], connect['id']))
        mylogger.debug(f"更新连接 {connect=}")

    g.db.commit()
