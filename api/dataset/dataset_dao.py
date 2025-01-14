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


def delete_by(dataset_id):
    g.db.execute("DELETE FROM datasets WHERE id=:id", (dataset_id,))
    # 同时删除列名表
    g.db.execute("DELETE FROM columns WHERE dataset_id=:dataset_id", (dataset_id,))
    g.db.commit()


def select_by_connect(connect_id):
    g.db.execute("SELECT ds.*, cs.name AS connect_name, cs.type FROM datasets ds LEFT JOIN connects cs ON ds.connect_id = cs.id")
    mylogger.debug(f"查询所有的数据集 {connect_id=}")
    result = g.db.fetchall()
    mylogger.debug(f"查询所有的数据集 {result=}")

    return result


def save_datasets(dataset):
    if dataset['id'].strip() == '':
        dataset['id'] = f'dataset_{uuidid()}'
        g.db.execute("INSERT INTO datasets(id, connect_id, name, sql) VALUES (:id, :connect_id, :name, :sql)", (dataset['id'], dataset['connect_id'], dataset['name'], dataset['sql']))
        mylogger.debug(f"添加数据集 {dataset=}")
        # 同时添加到列名表
        _, desc = DatasetReader.read(dataset['id'])
        print('列描述', desc)
        for col in desc:
            g.db.execute("INSERT INTO columns(id, colname, dataset_id) VALUES (:id, :colname, :dataset_id)", (f'col_{uuidid()}', col, dataset['id']))
    else:
        g.db.execute("UPDATE datasets SET name=:name, sql=:sql WHERE id=:id", (dataset['name'], dataset['sql'], dataset['id']))
        mylogger.debug(f"更新数据集 {dataset=}")
        # 同时更新列名表
        _, desc = DatasetReader.read(dataset['id'])
        g.db.execute("DELETE FROM columns WHERE dataset_id=:dataset_id", (dataset['id'],))
        for col in desc:
            g.db.execute("INSERT INTO columns(id, colname, dataset_id) VALUES (:id, :colname, :dataset_id)", (f'col_{uuidid()}', col[0], dataset['id']))

    g.db.commit()
