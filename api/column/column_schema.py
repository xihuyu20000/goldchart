import webargs

datafile_id_schema = {
    'datafile_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

column_schema = {
    'datafile_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'columns': webargs.fields.Raw(required=True)
}
