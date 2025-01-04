import webargs

login_schema = {
    'username': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'password': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
logout_schema = {
    'token': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),

}
log_schema = {
    'token': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'ffrom': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'tto': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
}
