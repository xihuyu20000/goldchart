import webargs

login_schema = {
    'username': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0),
    'password': webargs.fields.Str(required=True, validate=lambda x: len(x) > 0)
}
