from flask import g

from base import mylogger


def load_datafiles():
    g.db.cs.execute("SELECT * FROM datafiles")
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


def load_metadata_by_datafile_id(datafile_id):
    g.db.cs.execute("SELECT * FROM columns WHERE datafile_id=?", (datafile_id,))
    columns = g.db.cs.fetchall()

    return columns


def delete_cols_by_datafile_id(datafile_id):
    mylogger.debug(f"删除数据文件下的所有列 {datafile_id=}")

    g.db.cs.execute("DELETE FROM columns WHERE datafile_id=?", (datafile_id,))
    g.db.conn.commit()
