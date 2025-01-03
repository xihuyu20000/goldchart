import typing

from flask import g


def insert_cols(metadata: typing.List):
    """
    添加列
    :param cols:
    :return:
    """

    for col in metadata:
        g.db.cs.execute("INSERT INTO columns VALUES (:id, :colname, :coltype, :colstyle, :datafile_id)", col)
    g.db.conn.commit()
