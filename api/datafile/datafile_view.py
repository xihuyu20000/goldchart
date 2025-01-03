import json
import os

import pandas as pd
import webargs
from flask import Blueprint, jsonify, Response

from api.column import column_dao
from api.column.column_model import Column
from api.datafile import datafile_dao
from api.datafile.datafile_schema import datafiles_loadmetadata_schema, datafiles_remove_schema, datafile_load_schema, datafiles_savemetadata_schema
from base import basepath, uuidid, mylogger

datafile_page = Blueprint('datafile_page', __name__)


@datafile_page.post('/api/datafiles/loadall')
def datafiles_loadall():
    datafiles = datafile_dao.load_datafiles()
    data = {'code': 200, 'data': datafiles}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@datafile_page.post('/api/datafile/load')
@webargs.flaskparser.use_args(datafile_load_schema, location='json')
def datafile_load(req_data):
    chart_id = req_data['chart_id']
    mylogger.debug(f"{chart_id=}")
    data = pd.read_excel('dist/1.xlsx')
    data = data.to_json(orient='records', force_ascii=False)
    json_response = {'code': 200, 'data': data}
    # json_response = json.dumps(data, ensure_ascii=False)
    return jsonify(json_response)


@datafile_page.post('/api/datafiles/remove')
@webargs.flaskparser.use_args(datafiles_remove_schema, location='json')
def datafiles_remove(req_data):
    file_id = req_data['file_id']
    datafile_path = os.path.join(basepath, 'dist', file_id)
    if os.path.exists(datafile_path):
        os.remove(datafile_path)
        datafile_dao.delete_datafile(file_id)
    data = {'code': 200, 'data': []}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@datafile_page.post('/api/datafiles/loadmetadata')
@webargs.flaskparser.use_args(datafiles_loadmetadata_schema, location='json')
def datafiles_loadmetadata(req_data):
    datafile_id = req_data['datafile_id']
    datafile_path = os.path.join(basepath, 'dist', datafile_id)

    data = datafile_dao.load_metadata_by_datafile_id(datafile_id)
    if not data:
        data = [{'id': uuidid(), 'colname': col, 'coltype': 'text', 'colstyle': 'dimension', 'datafile_id': datafile_id, } for col in pd.read_excel(datafile_path).columns.tolist()]
    data = {'code': 200, 'data': data}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@datafile_page.post('/api/datafiles/savemetadata')
@webargs.flaskparser.use_args(datafiles_savemetadata_schema, location='json')
def datafiles_savemetadata(req_data):
    # 从request中取值
    datafile_id = req_data['datafile_id']
    metadata = req_data['metadata']

    columns = [Column(**item) for item in metadata]
    mylogger.debug(f"{datafile_id=}, {columns=}")
    if columns:
        # 2-1 删除数据
        datafile_dao.delete_cols_by_datafile_id(datafile_id)
        # 2-2 插入数据
        column_dao.insert_cols(columns)

    data = {'code': 200, 'data': []}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
