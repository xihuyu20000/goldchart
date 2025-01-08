import webargs

user_id_schema = {
    'user_id': webargs.fields.Str(required=True)
}
dataset_id_schema = {
    'dataset_id': webargs.fields.Str(required=True)
}
dataset_save_schema = {
    'removeRecords': webargs.fields.Str(required=False),
    'insertRecords': webargs.fields.Str(required=False),
    'updateRecords': webargs.fields.Str(required=False),
}