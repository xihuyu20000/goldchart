import json

import webargs
from flask import Blueprint, Response

from api.column import column_dao
from api.column.column_model import Column
from api.column.column_schema import column_schema
from utils import mylogger

column_page = Blueprint('column_page', __name__)


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
