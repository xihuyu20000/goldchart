import json

import sqlparse
from flask import Response, Blueprint
from webargs import fields
from webargs.flaskparser import use_args

import utils
from api.dataset import dataset_dao
from utils import mylogger

chart_page = Blueprint('chart_page', __name__)


@chart_page.post('/chart/getdata_by')
@use_args({
    "user_id": fields.Str(required=True),
    "ins_id": fields.Str(required=True),
    "chart_id": fields.Str(required=True, validate=lambda x: str(x).startswith('/')),
    "dataset_id": fields.Str(required=True, validate=lambda x: str(x).startswith('dataset_')),
    "title": fields.Str(required=True),
    "columns": fields.List(fields.Str()),
    "xCols": fields.List(fields.Raw()),
    "yCols": fields.List(fields.Raw())
}, location='json')
def chart_getdata_by(req_data):
    print(type(req_data), req_data)
    dataset = dataset_dao.select_by_id(req_data['dataset_id'])
    newsql = sql_builder(dataset['sql'], req_data)

    datalist, desc = utils.DatasetReader.read(req_data['dataset_id'], newsql)
    json_response = json.dumps({'chart_columns': desc, 'chart_datas': datalist}, ensure_ascii=False, cls=utils.CustomJSONEncoder)
    return Response(json_response, content_type='application/json')


def sql_builder(rawsql, config):
    groups = ",".join([xCol['name'] for xCol in config['xCols']])
    selects = ",".join([f"{col['aggr']}({col['name']}) AS {col['name']}" for col in config['yCols']])
    sorts = ",".join([f"{col['aggr']}({col['name']}) {col['sort']}" for col in config['yCols']])
    newsql = f"SELECT {groups}, {selects} FROM ({rawsql} ) AS t1 GROUP BY {groups} ORDER BY {sorts}"
    print('新生成的sql', newsql)
    # sqlparse.parse(newsql)

    return newsql
