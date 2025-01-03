import webargs

config_set_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'data': webargs.fields.Dict(required=True)
}

config_get_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'key': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
