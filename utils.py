import json
import os
import sqlite3
import threading
import typing
import uuid

import pymysql
from flask import g
from loguru import logger

# 1 获取当前模块的根目录
basepath = os.path.dirname(os.path.abspath(__file__))


# 2 生成一个唯一的ID
def uuidid():
    return str(uuid.uuid1()).replace('-', '')


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

    def execute(self, *args, **kwargs):
        mylogger.info(f"SQL语句 " + args[0])
        mylogger.info(f"SQL参数 " + str(args[1] if len(args) > 1 else ''))
        self.cs.execute(*args, **kwargs)

    def fetchall(self):
        return self.cs.fetchall()

    def fetchone(self):
        return self.cs.fetchone()

    def commit(self):
        self.conn.commit()

    def close(self):
        self.cs.close()
        self.conn.close()
        DbWrapper.lock.release()


db = DbWrapper()


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


class DatasetReader:

    def _run_sqlite(sql, params) -> typing.Tuple[typing.List, typing.List]:
        conn = sqlite3.connect(params['path'], timeout=10, check_same_thread=False)
        cs = conn.cursor()
        cs.execute(sql)
        result = db.fetchall()
        desc = cs.description
        cs.close()
        conn.close()
        return result, desc

    def _run_mysql(sql, params) -> typing.Tuple[typing.List, typing.List]:
        conn = pymysql.connect(host=params['host'], port=params['port'], user=params['user'], password=params['password'],
                               db=params['db'], charset='utf8mb4')
        cs = conn.cursor()
        cs.execute(sql)
        result = cs.fetchall()
        desc = cs.description
        desc = [d[0] for d in desc]
        cs.close()
        conn.close()
        return result, desc

    @staticmethod
    def read(dataset_id: str) -> typing.Tuple[typing.List, typing.List]:
        g.db.execute("SELECT ds.*, cs.type, cs.params FROM datasets ds LEFT JOIN connects cs ON ds.connect_id = cs.id WHERE ds.id=:id", (dataset_id,))
        ds = g.db.fetchone()

        if ds['type'] == 'mysql':
            result, desc = DatasetReader._run_mysql(ds['sql'], json.loads(ds['params']))
        if ds['type'] == 'sqlite':
            result, desc = DatasetReader._run_sqlite(ds['sql'], json.loads(ds['params']))
        mylogger.warning(result)
        mylogger.warning(desc)

        return result, desc
