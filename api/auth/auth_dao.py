import typing

from flask import g

from base import mylogger


def check_login(username, password) -> typing.Dict[str, str]:
    """
    验证登录
    :param username: 用户名
    :param password: 密码
    :return: 用户
    """
    g.db.cs.execute("SELECT * FROM users WHERE username=? AND password=?", (username, password))
    user = g.db.cs.fetchone()
    user = user if user else {}
    mylogger.debug(f"查询用户信息 {username=} {password=}  {user=}")
    return user


def dolog(token, ffrom, tto):
    """
    访问日志
    :param token:
    :param ffrom: 从哪里来
    :param tto: 到那里去
    :return:
    """
    g.db.cs.execute(f"INSERT INTO logs (user_id, ffrom, tto) VALUES ('{token}', '{ffrom}', '{tto}')")
    g.db.conn.commit()