
import sqlite3

from webargs import flaskparser

from utils import mylogger, db

# 5 创建数据库连接


from flask import Flask, g, jsonify, request

from api.auth.auth_view import auth_page
from api.chart.chart_view import chart_page
from api.column.column_view import column_page
from api.connect.connect_view import connect_page
from api.dataset.dataset_view import dataset_page
from api.ins.ins_view import ins_page
from api.project.project_view import project_page
from api.setting.setting_view import setting_page


def register_db(app, db):
    db.connect()

    # 读取SQL文件内容
    with open('ddl.sql', 'r', encoding='utf-8') as file:
        sql_script = file.read()

    # 分割SQL语句（假设每个语句以';'结尾）
    sqls = sql_script.split(';')

    # 执行每个SQL语句
    for one_sql in sqls:
        try:
            # 去除SQL语句前后的空格和换行符
            one_sql = one_sql.strip()
            if one_sql:  # 如果语句不为空，则执行
                db.cs.execute(one_sql)
        except sqlite3.Error as e:
            print(f"执行DDL出错: {e.args[0]}")
    db.conn.commit()
    db.close()

    mylogger.info('db init')


def register_routers(app):
    app.register_blueprint(auth_page, url_prefix='/api')
    app.register_blueprint(chart_page, url_prefix='/api')
    app.register_blueprint(column_page, url_prefix='/api')
    app.register_blueprint(connect_page, url_prefix='/api')
    app.register_blueprint(dataset_page, url_prefix='/api')
    app.register_blueprint(ins_page, url_prefix='/api')
    app.register_blueprint(project_page, url_prefix='/api')
    app.register_blueprint(setting_page, url_prefix='/api')


def create_app(config_name=''):
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.config['SECRET_KEY'] = 'abc'



    register_db(app, db)
    register_routers(app)

    @app.before_request
    def _before_request():
        g.db = db
        g.db.connect()
        mylogger.debug(f'start request {request.url}  {request.get_json() if request.is_json else request.form}')

    @app.teardown_request
    def _teardown_request(env):
        g.db.close()
        mylogger.debug('end request')

    @app.after_request
    def _after_request(response):
        mylogger.debug(f'response {response.get_json()}')
        return response

    # 处理验证错误的函数
    @flaskparser.parser.error_handler
    def handle_error(error, req, schema, error_status_code, error_headers):
        # error 是一个 ValidationError 实例
        # error.messages 是一个包含错误信息的字典
        messages = error.messages

        # 返回一个自定义的JSON响应
        return jsonify({
            'message': 'Validation error',
            'errors': messages
        }), error_status_code

    @app.get("/")
    def index():
        return 'hello world'

    return app