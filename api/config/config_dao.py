import typing

from flask import g

from base import mylogger


def save_config(user_id: str, data: typing.Dict[str, str]):
    mylogger.debug(f"保存配置 {user_id=} {data=}")

    for key, value in data.items():
        g.db.cs.execute("DELETE FROM config WHERE user_id=? AND key=?", (user_id, key))
        g.db.cs.execute("INSERT INTO config VALUES (:user_id, :key, :value)", (user_id, key, value))
    g.db.conn.commit()


def get_config(user_id: str, key: str):
    mylogger.debug(f"查询配置 {user_id=} {key=}")

    g.db.cs.execute("SELECT * FROM config WHERE user_id=? AND key=?", (user_id, key))
    result = g.db.cs.fetchone()
    result = result['value'] if result else ''

    return result
