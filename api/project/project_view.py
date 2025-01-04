import json
import os

import webargs
from flask import Blueprint, request, Response


from api.project import project_dao
from api.project.project_schema import user_id_schema, project_save_schema
from base import uuidid, mylogger

project_page = Blueprint('project_page', __name__)


@project_page.post('/project/loadall')
@webargs.flaskparser.use_args(user_id_schema, location='json')
def project_loadall(req_data):
    """
    查询当前用户的所有项目
    :param req_data:
    :return:
    """
    user_id = req_data['user_id']
    projects = project_dao.load_by_userid(user_id)
    data = {'code': 200, 'data': projects}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@project_page.post('/project/save')
@webargs.flaskparser.use_args(project_save_schema, location='json')
def project_save(req_data):
    """
    保存项目，包括增删改的各个项目
    :param req_data:
    :return:
    """
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

    for record in insertRecords: record['id'] = 'project-'+uuidid()
    project_dao.save_projects(user_id, insertRecords, updateRecords, removeRecords)
    data = {'code': 200, 'data': {}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


