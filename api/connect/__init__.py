import sqlite3

import pymysql


class SqliteParams:
    def __init__(self, path):
        self.path = path


class MySQLParams:
    def __init__(self, user, password, host, port, db):
        self.user = user
        self.password = password
        self.host = host
        self.port = port
        self.db = db


def connect_sqlite(params: SqliteParams):
    conn = sqlite3.connect(params.db_path)
    conn.close()


def connect_mysql(params: MySQLParams):
    conn = pymysql.connect(user=params.user, passwd=params.password, host=params.host, port=params.port, db=params.db)
    conn.close()
