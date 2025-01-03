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
