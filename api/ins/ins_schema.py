import webargs

ins_user_id_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
ins_config_option_schema = {
    'ins_id': webargs.fields.Str(required=True),
    'config': webargs.fields.Dict(required=True),
    'option': webargs.fields.Dict(required=True)
}

ins_id_schema = {
    'ins_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
