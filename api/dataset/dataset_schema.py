import webargs
id_schema = {
    'id': webargs.fields.Str(required=True)
}
user_id_schema = {
    'user_id': webargs.fields.Str(required=True)
}
dataset_id_schema = {
    'dataset_id': webargs.fields.Str(required=True)
}
dataset_save_schema = {
    'id': webargs.fields.Str(required=False),
    'connect_id': webargs.fields.Str(required=False),
    'name': webargs.fields.Str(required=False),
    'sql': webargs.fields.Str(required=False),
}
