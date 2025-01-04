import json
import os

import webargs
from flask import Blueprint, Response, request

from api.chart import chart_dao
from api.chart.chart_model import Chart
from api.column import column_dao
from api.datafile import datafile_dao
from api.datafile.datafile_schema import user_id_schema, file_id_schema, upload_schema

from base import basepath, uuidid, mylogger

datafile_page = Blueprint('datafile_page', __name__)


@datafile_page.post('/datafile/loadall')
@webargs.flaskparser.use_args(user_id_schema, location='json')
def datafiles_loadall(req_data):
    """
    加载当前用户的所有数据文件，需要user_id字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    datafiles = datafile_dao.load_datafiles(user_id)
    data = {'code': 200, 'data': datafiles}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
@datafile_page.post('/datafile/loadallcols')
@webargs.flaskparser.use_args(user_id_schema, location='json')
def datafiles_loadallcols(req_data):
    """
    加载当前用户的所有数据文件和对应的列名，需要user_id字段
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    datafiles = datafile_dao.load_datafiles(user_id)
    for datafile in datafiles:
        datafile['cols'] = column_dao.load_by_datafile_id(datafile['id'])
    data = {'code': 200, 'data': datafiles}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')




@datafile_page.post('/datafile/remove')
@webargs.flaskparser.use_args(file_id_schema, location='json')
def datafiles_remove(req_data):
    """
    根据datafile_id删除该文件
    :param req_data:
    :return:
    """
    datafile_id = req_data['datafile_id']
    datafile_path = os.path.join(basepath, 'files', datafile_id)
    # 1 判断删除文件
    if os.path.exists(datafile_path):
        # 2 删除文件
        os.remove(datafile_path)
        # 3 删除数据库记录
        datafile_dao.delete_datafile(datafile_id)
    data = {'code': 200, 'data': []}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@datafile_page.post('/datafile/upload')
@webargs.flaskparser.use_args(upload_schema, location='form')
def datafile_upload(req_data):
    print('datafile_upload')
    user_id = req_data['user_id']
    project_id = req_data['project_id']

    f = request.files['file']

    fname = f'datafile-{uuidid()}{f.filename}'
    upload_path = os.path.join(basepath, 'files', fname)
    f.save(upload_path)
    mylogger.debug(f'upload file {fname}')
    chart = Chart(id=fname, rawname=f.filename, fpath=fname, user_id=user_id, project_id=project_id)
    datafile = chart_dao.insert_chart_data(chart)
    data = {'code': 200, 'data': datafile}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
