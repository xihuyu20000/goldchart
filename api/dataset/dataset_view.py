import json

import webargs
from flask import Blueprint, Response

from api.dataset import dataset_dao
from api.dataset.dataset_schema import dataset_save_schema, dataset_id_schema, user_id_schema
from utils import mylogger, uuidid

dataset_page = Blueprint('dataset_page', __name__)


@dataset_page.post('/dataset/loadall')
@webargs.flaskparser.use_args(user_id_schema, location='json')
def dataset_loadall(req_data):
    """
    查询所有数据集
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    datasets = dataset_dao.select_all()
    data = {'code': 200, 'data': datasets}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
@dataset_page.post('/dataset/loadby')
@webargs.flaskparser.use_args(dataset_id_schema, location='json')
def dataset_load_by(req_data):
    """
    查询当前连接的所有数据集
    :param req_data:
    :return:
    """
    connect_id = req_data['connect_id']
    datasets = dataset_dao.select_by_connect(connect_id)
    data = {'code': 200, 'data': datasets}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')

@dataset_page.post('/dataset/save')
@webargs.flaskparser.use_args(dataset_save_schema, location='json')
def dataset_save(req_data):
    """
    保存数据集，包括增删改的各个连接
    :param req_data:
    :return:
    """
    removeRecords = req_data['removeRecords']
    insertRecords = req_data['insertRecords']
    updateRecords = req_data['updateRecords']

    removeRecords = json.loads(removeRecords)
    insertRecords = json.loads(insertRecords)
    updateRecords = json.loads(updateRecords)

    mylogger.info(f"{removeRecords=}")
    mylogger.info(f"{insertRecords=}")
    mylogger.info(f"{updateRecords=}")

    for record in insertRecords: record['id'] = 'dataset_'+uuidid()
    dataset_dao.save_datasets(insertRecords, updateRecords, removeRecords)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


