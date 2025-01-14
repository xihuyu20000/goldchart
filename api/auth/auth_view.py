import json

import webargs
from flask import Response, Blueprint, session

from api.auth import auth_dao
from api.auth.auth_schema import login_schema, logout_schema, log_schema
from utils import mylogger

auth_page = Blueprint('auth_page', __name__)


@auth_page.post('/login')
@webargs.flaskparser.use_args(login_schema, location='json')
def api_login(req_data):
    """
    登录，必须含有username和password两个字段
    :param req_data:
    :return:
    """
    username = req_data['username']
    password = req_data['password']
    mylogger.debug(f"{username=},  {password=}")

    user = auth_dao.check_login(username, password)
    del user['password']
    session['token'] = user['id']
    mylogger.debug(f"用户登录成功, {user=}")
    data = {'code': 200, 'data': {'token': session['token'], 'user': user}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@auth_page.post('/logout')
@webargs.flaskparser.use_args(logout_schema, location='json')
def logout(req_data):
    """
    退出登录，必须含有token字段，判断时哪个用户并记录在案
    :param req_data:
    :return:
    """
    token = req_data['token']
    session.pop('token', None)
    mylogger.debug(f"用户退出登录, {token=}")
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@auth_page.post('/log')
@webargs.flaskparser.use_args(log_schema, location='')
def dolog(req_data):
    """
    访问日志，含有token、ffrom、tto三个字段
    :param req_data:
    :return:
    """
    token = req_data['token']
    ffrom = req_data['ffrom']
    tto = req_data['tto']
    mylogger.debug(f"用户操作, {token=}  {ffrom=}  {tto=}")
    auth_dao.dolog(token, ffrom, tto)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
