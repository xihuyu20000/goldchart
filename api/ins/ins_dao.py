from flask import g

from utils import mylogger


def save_ins(ins_id: str, user_id: str, config: str, option: str):
    mylogger.debug(f"保存实例 {config=} {option=}")
    g.db.execute("SELECT * FROM ins WHERE id=?", (ins_id,))
    if g.db.cs.fetchone():
        g.db.execute("UPDATE ins SET config=?, option=? WHERE id=?", (config, option, ins_id))
    else:
        g.db.execute("INSERT INTO ins VALUES(:ins_id, :user_id, :setting, :option)", (ins_id, user_id, config, option))

    g.db.commit()


def select_by_userid(user_id):
    g.db.execute("SELECT * FROM ins WHERE user_id=?", (user_id,))
    data = g.db.fetchall()
    mylogger.debug(f"查询所有的实例 {data=}")
    return data
