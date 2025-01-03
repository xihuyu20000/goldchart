import webargs

chart_id_schema = {
    'chart_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
project_id_schema = {
    'project_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
