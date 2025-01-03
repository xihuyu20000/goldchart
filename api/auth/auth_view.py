import json

import webargs
from flask import Response, Blueprint, session

from api.auth import auth_dao
from api.auth.auth_schema import login_schema
from base import mylogger

auth_page = Blueprint('auth_page', __name__)


@auth_page.post('/api/login')
@webargs.flaskparser.use_args(login_schema, location='json')
def api_login(req_data):
    username = req_data['username']
    password = req_data['password']
    mylogger.debug(f"{username=},  {password=}")

    user = auth_dao.check_login(username, password)
    session['token'] = user['id']

    data = {'code': 200, 'data': {'token': session['token']}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
