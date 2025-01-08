from flask import g

from utils import mylogger, DatasetReader, uuidid


def select_all():
    g.db.execute("SELECT ds.*, cs.type, cs.params FROM datasets ds LEFT JOIN connects cs ON ds.connect_id = cs.id")
    result = g.db.cs.fetchall()
    mylogger.debug(f"查询数据集 {result=}")
    return result
def select_by_id(dataset_id):
    g.db.execute("SELECT ds.*, cs.type, cs.params FROM datasets ds LEFT JOIN connects cs ON ds.connect_id = cs.id WHERE ds.id=:id", (dataset_id,))
    mylogger.debug(f"查询数据集 {dataset_id=}")
    result = g.db.cs.fetchone()
    mylogger.debug(f"查询数据集 {result=}")
    return result
def select_by_connect(connect_id):
    g.db.execute("SELECT ds.*, cs.name AS connect_name, cs.type FROM datasets ds LEFT JOIN connects cs ON ds.connect_id = cs.id")
    mylogger.debug(f"查询所有的数据集 {connect_id=}")
    result = g.db.fetchall()
    mylogger.debug(f"查询所有的数据集 {result=}")

    return result


def save_datasets(insertRecords, updateRecords, removeRecords):
    if insertRecords:
        for record in insertRecords:
            g.db.execute("INSERT INTO datasets(id, connect_id, name, sql) VALUES (:id, :connect_id, :name, :sql)", (record['id'], record['connect_id'], record['name'], record['sql']))
            mylogger.debug(f"添加数据集 {record=}")
            # 同时添加到列名表
            _, desc = DatasetReader.read(record['id'])
            for col in desc:
                g.db.execute("INSERT INTO columns(id, colname, dataset_id) VALUES (:id, :colname, :dataset_id)", (f'col_{uuidid()}', col[0], record['id']))

    if updateRecords:
        for record in updateRecords:
            g.db.execute("UPDATE datasets SET name=:name, sql=:sql WHERE id=:id", (record['name'], record['sql'], record['id']))
            mylogger.debug(f"更新数据集 {record=}")
            # 同时更新列名表
            _, desc = DatasetReader.read(record['id'])
            g.db.execute("DELETE FROM columns WHERE dataset_id=:dataset_id", (record['id'],))
            for col in desc:
                g.db.execute("INSERT INTO columns(id, colname, dataset_id) VALUES (:id, :colname, :dataset_id)", (f'col_{uuidid()}', col[0], record['id']))

    if removeRecords:
        for record in removeRecords:
            g.db.execute("DELETE FROM datasets WHERE id=:id", (record['id'],))
            mylogger.debug(f"删除数据集 {record=}")
            # 同时删除列名表
            g.db.execute("DELETE FROM columns WHERE dataset_id=:dataset_id", (record['id'],))

    g.db.commit()