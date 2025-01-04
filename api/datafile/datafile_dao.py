from flask import g

from base import mylogger


def load_datafiles(user_id):
    """
    根据user_id加载数据文件
    :param user_id:
    :return:
    """
    g.db.cs.execute("SELECT df.*, p.name AS project_name FROM datafiles df LEFT JOIN projects p ON df.project_id=p.id WHERE df.user_id=?", (user_id,))
    datafiles = g.db.cs.fetchall()
    mylogger.debug(f"查询所有的数据文件 {datafiles=}")
    return datafiles


def delete_datafile(datafile_id: str):
    """
    删除数据文件
    :param datafile_id:
    :return:
    """

    g.db.cs.execute("DELETE FROM datafiles WHERE id=?", (datafile_id,))
    g.db.conn.commit()
