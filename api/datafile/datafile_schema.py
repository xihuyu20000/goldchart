import webargs

user_id_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

chart_id_schema = {
    'chart_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

file_id_schema = {
    'datafile_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
upload_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'project_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'file':webargs.fields.Raw(required=False)
}