import os
import sqlite3
import threading
import uuid

from loguru import logger
from webargs import flaskparser

# 1 获取当前模块的根目录
basepath = os.path.dirname(os.path.abspath(__file__))


# 2 生成一个唯一的ID
def uuidid():
    return str(uuid.uuid1()).replace('-', '')


# 3 创建日志记录器工厂
class LoguruFactory:
    # 配置日志格式
    log_format = "<green>{time:YYYY-MM-DD HH:mm:ss.SSS}</green> | " \
                 "<level>{level: <8}</level> | " \
                 "<cyan>{name}</cyan>:<cyan>{function}</cyan>:<cyan>{line}</cyan> - " \
                 "<level>{message}</level>"

    @staticmethod
    def create_logger(log_file=None):
        logger.add(
            sink=log_file,
            level="DEBUG",
            rotation="00:00",  # 每天午夜自动滚动日志
            retention="7 days",  # 保留最近7天的日志
            compression="zip",  # 压缩旧的日志文件
            enqueue=True,  # 在多线程环境中使用队列来处理日志
            backtrace=True,  # 记录堆栈跟踪
            diagnose=True,  # 记录异常诊断信息
        )

        return logger


# 4 创建日志记录器
mylogger = LoguruFactory.create_logger("goldchart.log")


# 5 创建数据库连接
class DbWrapper:
    lock = threading.Lock()

    @staticmethod
    def dict_factory(cursor, row):
        d = {}
        for idx, col in enumerate(cursor.description):
            d[col[0]] = row[idx]
        return d

    def connect(self):
        DbWrapper.lock.acquire(True)
        self.conn = sqlite3.connect('db.sqlite', timeout=10, check_same_thread=False)
        self.conn.row_factory = DbWrapper.dict_factory
        self.cs = self.conn.cursor()

    def close(self):
        self.cs.close()
        self.conn.close()
        DbWrapper.lock.release()



from flask import Flask, g, jsonify, request

from api.auth.auth_view import auth_page
from api.chart.chart_view import chart_page
from api.config.config_view import config_page
from api.datafile.datafile_view import datafile_page
from api.project.project_view import project_page


def register_db(app, db):
    db.connect()

    db.cs.execute(f"CREATE TABLE IF NOT EXISTS config (user_id TEXT, key TEXT, value TEXT)")
    db.cs.execute(f"CREATE TABLE IF NOT EXISTS users (id TEXT, username TEXT, password TEXT)")
    db.cs.execute(f"CREATE TABLE IF NOT EXISTS projects (id TEXT, name TEXT, user_id TEXT)")
    db.cs.execute(f"CREATE TABLE IF NOT EXISTS datafiles (id TEXT, rawname TEXT, fpath TEXT, user_id TEXT, project_id TEXT)")
    db.cs.execute(f"CREATE TABLE IF NOT EXISTS charts (id TEXT, name TEXT, fpath TEXT, user_id TEXT, project_id TEXT)")
    db.cs.execute(f"CREATE TABLE IF NOT EXISTS columns (id TEXT, colname TEXT, coltype TEXT, colstyle TEXT, datafile_id TEXT)")

    db.close()

    mylogger.info('db init')


def register_routers(app):
    app.register_blueprint(auth_page)
    app.register_blueprint(chart_page)
    app.register_blueprint(config_page)
    app.register_blueprint(datafile_page)
    app.register_blueprint(project_page)


def create_app(config_name=''):
    app = Flask(__name__)
    app.config['JSON_AS_ASCII'] = False
    app.config['SECRET_KEY'] = 'abc'

    db = DbWrapper()

    register_db(app, db)
    register_routers(app)



    @app.before_request
    def _db_connect():
        g.db = db
        g.db.connect()
        mylogger.debug(f'start request  {request.get_json()}')

    @app.teardown_request
    def _db_close(env):
        g.db.close()
        mylogger.debug('end request')

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
