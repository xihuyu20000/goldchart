import json

import webargs
from flask import Response, Blueprint

from api.ins import ins_dao
from api.ins.ins_schema import ins_config_option_schema, ins_user_id_schema
from utils import mylogger, uuidid

ins_page = Blueprint('ins_page', __name__)


@ins_page.post('/ins/load_by_userid')
@webargs.flaskparser.use_args(ins_user_id_schema, location='json')
def ins_load_by_userid(req_data):
    mylogger.debug(f"{req_data=}")
    data = ins_dao.select_by_userid(req_data['user_id'])
    data = {'code': 200, 'data': data}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')


@ins_page.post('/ins/save')
@webargs.flaskparser.use_args(ins_config_option_schema, location='json')
def ins_save(req_data):
    mylogger.debug(f"{req_data=}")
    ins_id = req_data['ins_id'] if req_data['ins_id'] else f'ins_{uuidid()}'
    config = req_data['config']
    config['ins_id'] = ins_id
    option = req_data['option']
    ins_dao.save_ins(ins_id, config['user_id'], json.dumps(config), json.dumps(option))
    data = {'code': 200, 'data': {'ins_id': ins_id}}
    json_response = json.dumps(data, ensure_ascii=False)
    return Response(json_response, content_type='application/json')
