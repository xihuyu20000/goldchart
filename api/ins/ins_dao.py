from flask import g

from base import mylogger


def save_ins(ins_id: str, user_id: str, config: str, option: str):
    mylogger.debug(f"保存实例 {config=} {option=}")
    g.db.cs.execute("SELECT * FROM ins WHERE id=?", (ins_id,))
    if g.db.cs.fetchone():
        g.db.cs.execute("UPDATE ins SET config=?, option=? WHERE id=?", (config, option, ins_id))
    else:
        g.db.cs.execute("INSERT INTO ins VALUES(:ins_id, :user_id, :config, :option)", (ins_id, user_id, config, option))

    g.db.conn.commit()


def select_by_userid(user_id):
    g.db.cs.execute("SELECT * FROM ins WHERE user_id=?", (user_id,))
    data = g.db.cs.fetchall()
    mylogger.debug(f"查询所有的实例 {data=}")
    return data
