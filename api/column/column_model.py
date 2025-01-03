import typing

Column = typing.NamedTuple('Column', [('id', str), ('colname', str), ('coltype', str), ('colstyle', str), ('datafile_id', str)])
