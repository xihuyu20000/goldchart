import json

import webargs
from flask import Blueprint, Response

from api.config import config_dao
from api.config.config_schema import config_get_schema, config_set_schema
from base import mylogger

config_page = Blueprint('config_page', __name__)


@config_page.post('/config/set')
@webargs.flaskparser.use_args(config_set_schema, location='json')
def config_set(req_data):
    """
    保存配置信息，有user_id、data两个字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    data = req_data['data']
    mylogger.debug(f"写入配置 {user_id=} {data=}")
    config_dao.save_config(user_id, data)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@config_page.post('/config/get')
@webargs.flaskparser.use_args(config_get_schema, location='json')
def config_get(req_data):
    """
    获取配置信息，有user_id、key两个字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    key = req_data['key']
    mylogger.debug(f"读取配置 {user_id=} {key=}")
    value = config_dao.get_config(user_id, key)
    data = {'code': 200, 'data': {'value': value}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
