import json

import webargs
from flask import Response, Blueprint, session

from api.chart import chart_helper as ss, chart_dao
from api.chart.chart_schema import project_id_schema, chart_id_schema, chart_token_schema
from api.config import config_dao
from base import mylogger

chart_page = Blueprint('chart_page', __name__)



@chart_page.post('/chart_getdata')
@webargs.flaskparser.use_args(chart_token_schema, location='json')
def chart_getdata(req_data):
    """
    根据图表类型，加载数据，参数包括chart_id、token两个字段
    :param req_data:
    :return:
    """
    chart_id = req_data['chart_id']
    token = req_data['token']
    datafile_id = config_dao.get_config(token, 'datafile_id')
    mylogger.debug(f"{chart_id=} {datafile_id=}")
    json_response = ss.gendata('chart', chart_id, datafile_id)
    mylogger.debug(f"{json_response=}")
    return Response(json_response, content_type='application/json')


# @chart_page.post('/chart/loadall')
# @webargs.flaskparser.use_args(project_id_schema, location='json')
# def chart_loadall(req_data):
#     project_id = req_data['project_id']
#     mylogger.debug(f"{project_id=}")
#     charts = chart_dao.select_by_projectid(project_id)
#     data = {'code': 200, 'data': charts}
#     json_response = json.dumps(data, ensure_ascii=False)
#     return Response(json_response, content_type='application/json')
