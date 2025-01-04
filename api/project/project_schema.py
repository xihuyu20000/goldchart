import webargs

user_id_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

project_save_schema = {
    'user_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'removeRecords': webargs.fields.Str(required=False),
    'insertRecords': webargs.fields.Str(required=False),
    'updateRecords': webargs.fields.Str(required=False),
}