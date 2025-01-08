import typing

from flask import g

from utils import mylogger


def save_setting(user_id: str, data: typing.Dict[str, str]):
    mylogger.debug(f"保存配置 {user_id=} {data=}")

    for key, value in data.items():
        g.db.execute("DELETE FROM settings WHERE user_id=? AND key=?", (user_id, key))
        g.db.execute("INSERT INTO settings VALUES (:user_id, :key, :value)", (user_id, key, value))
    g.db.commit()


def get_setting(user_id: str, key: str):
    mylogger.debug(f"查询配置 {user_id=} {key=}")

    g.db.execute("SELECT * FROM settings WHERE user_id=? AND key=?", (user_id, key))
    result = g.db.cs.fetchone()
    result = result['value'] if result else ''

    return result
