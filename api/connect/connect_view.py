import json

import webargs
from flask import Blueprint, Response

from api.connect import connect_dao
from api.connect.connect_schema import user_id_schema, connect_save_schema
from utils import mylogger, uuidid

connect_page = Blueprint('connect_page', __name__)


@connect_page.post('/connect/loadall')
@webargs.flaskparser.use_args(user_id_schema, location='json')
def connect_loadall(req_data):
    """
    查询当前用户的所有项目
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    connects = connect_dao.load_by_userid(user_id)
    data = {'code': 200, 'data': connects}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')

@connect_page.post('/connect/save')
@webargs.flaskparser.use_args(connect_save_schema, location='json')
def connect_save(req_data):
    """
    保存连接，包括增删改的各个连接
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']

    removeRecords = req_data['removeRecords']
    insertRecords = req_data['insertRecords']
    updateRecords = req_data['updateRecords']

    removeRecords = json.loads(removeRecords)
    insertRecords = json.loads(insertRecords)
    updateRecords = json.loads(updateRecords)

    mylogger.info(f"{removeRecords=}")
    mylogger.info(f"{insertRecords=}")
    mylogger.info(f"{updateRecords=}")

    for record in insertRecords: record['id'] = 'connect_'+uuidid()
    connect_dao.save_connects(user_id, insertRecords, updateRecords, removeRecords)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


