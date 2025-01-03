import json
import os

import webargs
from flask import Blueprint, request, Response

from api.chart.chart_model import Chart
from api.project import project_dao
from api.project.project_schema import project_uploadData_schema, project_loadall_schema, project_save_schema
from base import uuidid, basepath, mylogger

project_page = Blueprint('project_page', __name__)


@project_page.post('/api/project/loadall')
@webargs.flaskparser.use_args(project_loadall_schema, location='json')
def project_loadall(req_data):
    user_id = req_data['user_id']
    projects = project_dao.load_projects_by_userid(user_id)
    data = {'code': 200, 'data': projects}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')





@project_page.post('/api/project/save')
@webargs.flaskparser.use_args(project_save_schema, location='json')
def project_save(req_data):
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

    for record in insertRecords: record['id'] = uuidid()
    project_dao.save_projects(user_id, insertRecords, updateRecords, removeRecords)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@project_page.post('/api/project/uploadData')
@webargs.flaskparser.use_args(project_uploadData_schema, location='json')
def project_uploadData(req_data):
    user_id = req_data['user_id']
    project_id = req_data['project_id']
    f = request.files['file']

    fname = f'data-{uuidid()}{f.filename}'
    upload_path = os.path.join(basepath, 'dist', fname)
    f.save(upload_path)
    print(f"{upload_path=}")
    datafile = project_dao.insert_chart_data(Chart(id=fname, rawname=f.filename, fpath=fname, user_id=user_id, project_id=project_id))
    data = {'code': 200, 'data': datafile}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
