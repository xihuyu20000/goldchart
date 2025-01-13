import json

import sqlparse
import webargs
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
    "dataset_id": fields.Str(required=True, validate=lambda x:str(x).startswith('dataset_')),
    "title": fields.Str(required=True),
    "columns": fields.List(fields.Str()),
    "xCols": fields.List(fields.Raw()),
    "yCols": fields.List(fields.Raw()),
    "chart_columns":fields.List(fields.Raw()),
    "chart_datas": fields.List(fields.Raw()),
}, location='json')
def chart_getdata_by(req_data):
    print(type(req_data), req_data)
    dataset = dataset_dao.select_by_id(req_data['dataset_id'])
    newsql = sql_builder(dataset['sql'], req_data)

    datalist, desc = utils.DatasetReader.read(req_data['dataset_id'], newsql)
    json_response = json.dumps({'chart_columns':desc, 'chart_datas':datalist}, ensure_ascii=False, cls=utils.CustomJSONEncoder)
    return Response(json_response, content_type='application/json')

def sql_builder(rawsql, config):
    groups = ",".join([xCol['name'] for xCol in config['xCols']])
    selects = ",".join([f"{col['aggr']}({col['name']}) AS {col['name']}" for col in config['yCols']])
    sorts = ",".join([f"{col['name']} {col['sort']}" for col in config['yCols']])
    newsql = f"SELECT {groups}, {selects} FROM ({rawsql} ) AS t1 GROUP BY {groups} ORDER BY {sorts}"
    sqlparse.parse(newsql)
    mylogger.info('新生成的sql', newsql)
    return newsql
# @chart_page.post('/chart_getdata')
# @webargs.flaskparser.use_args(chart_token_schema, location='json')
# def chart_getdata(req_data):
#     """
#     根据图表类型，加载数据，参数包括chart_id、token两个字段
#     :param req_data:
#     :return:
#     """
#     chart_id = req_data['chart_id']
#     token = req_data['token']
#     datafile_id = config_dao.get_config(token, 'datafile_id')
#     mylogger.debug(f"{chart_id=} {datafile_id=}")
#     json_response = ss.gendata('chart', chart_id, datafile_id)
#     mylogger.debug(f"{json_response=}")
#     return Response(json_response, content_type='application/json')

# @chart_page.post('/chart/loadall')
# @webargs.flaskparser.use_args(project_id_schema, location='json')
# def chart_loadall(req_data):
#     project_id = req_data['project_id']
#     mylogger.debug(f"{project_id=}")
#     charts = chart_dao.select_by_projectid(project_id)
#     data = {'code': 200, 'data': charts}
#     json_response = json.dumps(data, ensure_ascii=False)
#     return Response(json_response, content_type='application/json')
