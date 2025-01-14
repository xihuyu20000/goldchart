import webargs

id_schema = {
    'id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
user_id_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
connect_save_schema = {
    'id': webargs.fields.Str(required=True),
    'user_id': webargs.fields.Str(required=True),
    'name': webargs.fields.Str(required=True),
    'type': webargs.fields.Str(required=True),
    'params': webargs.fields.Str(required=True),
}
