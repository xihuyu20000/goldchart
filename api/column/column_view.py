import json
import os

import pandas as pd
import webargs
from flask import Blueprint, Response

from api.column import column_dao
from api.column.column_model import Column
from api.column.column_schema import datafile_id_schema, column_schema
from base import basepath, uuidid, mylogger

column_page = Blueprint('column_page', __name__)


@column_page.post('/column/load')
@webargs.flaskparser.use_args(datafile_id_schema, location='json')
def column_load(req_data):
    """
    根据datafile_id查询元数据
    :param req_data:
    :return:
    """
    datafile_id = req_data['datafile_id']
    datafile_path = os.path.join(basepath, 'files', datafile_id)

    data = column_dao.load_by_datafile_id(datafile_id)
    if not data:
        data = [{'id': f'col-{uuidid()}', 'colname': col, 'coltype': 'text', 'colstyle': 'dimension', 'datafile_id': datafile_id } for col in pd.read_excel(datafile_path).columns.tolist()]
    data = {'code': 200, 'data': data}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@column_page.post('/column/save')
@webargs.flaskparser.use_args(column_schema, location='json')
def column_save(req_data):
    # 从request中取值
    datafile_id = req_data['datafile_id']
    columns = req_data['columns']

    columns = [Column(**item) for item in columns]
    mylogger.debug(f"{datafile_id=}, {columns=}")
    if columns:
        # 2-1 删除数据
        column_dao.delete_by_datafile_id(datafile_id)
        # 2-2 插入数据
        column_dao.insert_cols(columns)

    data = {'code': 200, 'data': []}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
