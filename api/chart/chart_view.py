import json

import webargs
from flask import Response, Blueprint, session

from api.chart import chart_helper as ss, chart_dao
from api.chart.chart_schema import project_id_schema, chart_id_schema
from api.config import config_dao
from base import mylogger

chart_page = Blueprint('chart_page', __name__)


@chart_page.post('/api/chart/load')
@webargs.flaskparser.use_args(chart_id_schema, location='json')
def chart_load(req_data):
    chart_id = req_data['chart_id']
    mylogger.debug(f"{chart_id=}")
    data = {'code': 200, 'data': []}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@chart_page.post('/api/chart_getdata')
@webargs.flaskparser.use_args(chart_id_schema, location='json')
def chart_getdata(req_data):
    chart_id = req_data['chart_id']
    datafile_id = config_dao.get_config(session['token'], 'datafile_id')
    mylogger.debug(f"{chart_id=} {datafile_id=}")
    json_response = ss.gendata('chart', chart_id, datafile_id)
    return Response(json_response, content_type='application/json')


@chart_page.post('/api/chart/loadall')
@webargs.flaskparser.use_args(project_id_schema, location='json')
def api_chart_loadall(req_data):
    project_id = req_data['project_id']
    mylogger.debug(f"{project_id=}")
    charts = chart_dao.load_charts_by_projectid(project_id)
    # charts = [{'id': f'data-{uuidid()}', 'name': '数据'}, {'id': f'chart-{uuidid()}', 'name': '凸包'}]
    data = {'code': 200, 'data': charts}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
