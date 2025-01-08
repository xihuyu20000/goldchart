import json

import webargs
from flask import Blueprint, Response

from api.setting import setting_dao
from api.setting.setting_schema import setting_get_schema, setting_set_schema
from utils import mylogger

setting_page = Blueprint('setting_page', __name__)


@setting_page.post('/setting/set')
@webargs.flaskparser.use_args(setting_set_schema, location='json')
def setting_set(req_data):
    """
    保存配置信息，有user_id、data两个字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    data = req_data['data']
    mylogger.debug(f"写入配置 {user_id=} {data=}")
    setting_dao.save_setting(user_id, data)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@setting_page.post('/setting/get')
@webargs.flaskparser.use_args(setting_get_schema, location='json')
def setting_get(req_data):
    """
    获取配置信息，有user_id、key两个字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    key = req_data['key']
    mylogger.debug(f"读取配置 {user_id=} {key=}")
    value = setting_dao.get_setting(user_id, key)
    data = {'code': 200, 'data': {'value': value}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
