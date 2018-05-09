const ref = require('ref');
const Struct = require('ref-struct');


const _vec_info = Struct({
  'index': 'int',
  'vecname': 'string',
  'is_real': 'bool',
  'pdvec': ref.refType('void'),
  'pdvecscale': ref.refType('void')
});
const _p_vec_info = ref.refType(_vec_info);

const _vec_info_all = Struct({
  'name': 'string',
  'title': 'string',
  'data': 'string',
  'type': 'string',
  'veccount': 'int',
  'vecs': ref.refType(_p_vec_info)
});
const _p_vec_info_all = ref.refType(_vec_info_all);

const _vec_values = Struct({
  'name': 'string',
  'creal': 'double',
  'cimag': 'double',
  'is_scale': 'bool',
  'is_complex': 'bool'
});
const _p_vec_values = ref.refType(_vec_values);

const _vec_values_all = Struct({
  'veccount': 'int',
  'vecindex': 'int',
  'vecsa': ref.refType(_p_vec_values),
});
const _p_vec_values_all = ref.refType(_vec_values_all);

module.exports = {
  p_vec_values_all: _p_vec_values_all,
  p_vec_info_all: _p_vec_info_all
}
