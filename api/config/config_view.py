import json

import webargs
from flask import Blueprint, Response
from loguru import logger

from api.config import config_dao
from api.config.config_schema import config_get_schema, config_set_schema

config_page = Blueprint('config_page', __name__)


@config_page.post('/api/config/set')
@webargs.flaskparser.use_args(config_set_schema, location='json')
def config_set(req_data):
    user_id = req_data['user_id']
    data = req_data['data']
    logger.debug(f"{user_id=} {data=}")
    config_dao.save_config(user_id, data)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@config_page.post('/api/config/get')
@webargs.flaskparser.use_args(config_get_schema, location='json')
def config_get(req_data):
    user_id = req_data['user_id']
    key = req_data['key']
    logger.debug(f"{user_id=} {key=}")
    value = config_dao.get_config(user_id, key)
    data = {'code': 200, 'data': {'value': value}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
