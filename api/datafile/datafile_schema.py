import webargs

datafile_load_schema = {
    'chart_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

datafiles_remove_schema = {
    'file_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
datafiles_loadmetadata_schema = {
    'datafile_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}

datafiles_savemetadata_schema = {
    'datafile_id': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'metadata': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
