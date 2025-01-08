-- 项目
CREATE TABLE IF NOT EXISTS projects
(
    id
    TEXT,
    name
    TEXT,
    user_id
    TEXT
);

-- 数据连接
CREATE TABLE IF NOT EXISTS connects
(
    id
    TEXT,
    user_id
    TEXT,
    name
    TEXT,
    type
    TEXT,
    params
    TEXT
);

-- 数据集
CREATE TABLE IF NOT EXISTS datasets
(
    id
    TEXT,
    connect_id
    TEXT,
    name
    TEXT,
    sql
    TEXT
);

-- 图表实例
CREATE TABLE IF NOT EXISTS ins
(
    id
    TEXT,
    user_id
    TEXT,
    config
    TEXT,
    option
    TEXT
);

-- 日志
CREATE TABLE IF NOT EXISTS logs
(
    id
    INTEGER
    PRIMARY
    KEY
    AUTOINCREMENT,
    user_id
    TEXT,
    ffrom
    TEXT,
    tto
    TEXT,
    logtime
    TIMESTAMP
    DEFAULT
    CURRENT_TIMESTAMP
);

-- 数据集的列描述
CREATE TABLE IF NOT EXISTS columns
(
    id
    TEXT,
    colname
    TEXT, -- 列名
    coltype
    TEXT, -- 列类型
    colstyle
    TEXT, -- 列：维度、测量
    datafile_id
    TEXT
);

-- 图表实例的配置信息
CREATE TABLE IF NOT EXISTS configs
(
    id
    TEXT,
    user_id
    TEXT,
    ins_id
    TEXT,
    chart_id
    TEXT,
    dataset_id
    TEXT,
    title
    TEXT,
    xCols
    TEXT,
    yCols
    TEXT,
    columns
    TEXT
);


-- 配置
CREATE TABLE IF NOT EXISTS settings
(
    user_id
    TEXT,
    key
    TEXT,
    value
    TEXT
);

-- 用户
CREATE TABLE IF NOT EXISTS users
(
    id
    TEXT,
    username
    TEXT,
    labelname
    TEXT,
    password
    TEXT
);
