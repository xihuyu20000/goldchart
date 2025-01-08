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
        g.db.execute("INSERT INTO columns(id, colname, coltype, colstyle, datafile_id) VALUES (:id, :colname, :coltype, :colstyle, :datafile_id)", col)
    g.db.commit()




def load_by_dataset(dataset_id):
    g.db.execute("SELECT * FROM columns WHERE dataset_id=?", (dataset_id,))
    columns = g.db.fetchall()
    return columns


def delete_by_datafile_id(datafile_id):
    g.db.execute("DELETE FROM columns WHERE datafile_id=?", (datafile_id,))
    g.db.commit()
