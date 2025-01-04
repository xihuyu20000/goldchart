import typing

from flask import g

from api.column.column_model import Column



def insert_cols(metadata: typing.List[Column]):
    """
    添加列
    :param cols:
    :return:
    """
    for col in metadata:
        g.db.cs.execute("INSERT INTO columns VALUES (:id, :colname, :coltype, :colstyle, :datafile_id)", col)
    g.db.conn.commit()




def load_by_datafile_id(datafile_id):
    g.db.cs.execute("SELECT * FROM columns WHERE datafile_id=?", (datafile_id,))
    columns = g.db.cs.fetchall()

    return columns


def delete_by_datafile_id(datafile_id):
    g.db.cs.execute("DELETE FROM columns WHERE datafile_id=?", (datafile_id,))
    g.db.conn.commit()
