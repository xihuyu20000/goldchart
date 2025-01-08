from flask import g

from api.chart.chart_model import Chart
from utils import mylogger


def select_by_projectid(project_id):
    """
    根据project_id查询
    :param project_id:
    :return:
    """

    g.db.execute("SELECT * FROM charts WHERE project_id=?", (project_id,))
    charts = g.db.fetchall()

    mylogger.debug(f"查询所有的图表 {project_id=}")
    return charts


def insert_chart_data(chart: Chart):
    """
    添加图表数据
    :param chart:
    :return:
    """
    assert chart.id.startswith("datafile-")
    assert chart.id == chart.fpath

    g.db.execute("INSERT INTO datafiles(id, rawname, fpath, user_id, project_id) VALUES (:id, :rawname, :fpath, :user_id, :project_id)", chart)
    g.db.commit()
    mylogger.debug(f"添加数据文件 {chart=}")
    g.db.execute("SELECT * FROM datafiles WHERE id=?", (chart.id,))
    datafile = g.db.cs.fetchone()

    return datafile


def delete_chart(chart_id: str):
    """
    删除图表
    :param chart_id:
    :return:
    """
    g.db.execute("DELETE FROM charts WHERE id=?", (chart_id,))
    mylogger.debug(f"删除图表 {chart_id=}")
    g.db.commit()
