const ref = require('ref');
const struct = require('ref-struct');

const _ng_complex = struct({
  // complex number struct
  // you should know this!
  'cx_real': 'double',
  'cx_imag': 'double'
});

const _vector_info = struct({
  // vector  name : name of this vector
  // vector  type :
  // vector  flag :
  // real    data : real number array
  // complex data : complex number array
  // array length : vector length
  'v_name': 'string',
  'v_type': 'int',
  'v_flags': 'short',
  'v_realdata': ref.refType('double'),
  'v_compdata': ref.refType(_ng_complex),
  'v_length': 'int'
});
const _p_vector_info = ref.refType(_vector_info);

const _vec_info = struct({
  // index       : index of this vector
  // vector name : the name of this vector
  // is     real : indicate if this vector is a complex vector
  // pdvec       :
  // pdvecscale  :
  'index': 'int',
  'vecname': 'string',
  'is_real': 'bool',
  'pdvec': ref.refType('void'),
  'pdvecscale': ref.refType('void')
});
const _p_vec_info = ref.refType(_vec_info);

const _vec_info_all = struct({
  // name     : name of this circuit
  // title    : circuit of this circuit
  // date     : date of this simulation
  // type     : simulation type
  // veccount : the number of vectors could get in this plot
  // vecs     : vectors
  'name': 'string',
  'title': 'string',
  'date': 'string',
  'type': 'string',
  'veccount': 'int',
  'vecs': ref.refType(_p_vec_info)
});
const _p_vec_info_all = ref.refType(_vec_info_all);

const _vec_values = struct({
  // name       : name of this point
  // creal      : real part of this point
  // cimag      : image part of this point
  // is scale   :
  // is complex : indicate if this point is a complex point
  'name': 'string',
  'creal': 'double',
  'cimag': 'double',
  'is_scale': 'bool',
  'is_complex': 'bool'
});
const _p_vec_values = ref.refType(_vec_values);

const _vec_values_all = struct({
  // veccount : numbers of vectors
  // vecindex : vecindex
  // vecsa    :
  'veccount': 'int',
  'vecindex': 'int',
  'vecsa': ref.refType(_p_vec_values),
});
const _p_vec_values_all = ref.refType(_vec_values_all);

module.exports = {
  p_vec_values_all: _p_vec_values_all,
  p_vector_info: _p_vector_info,
  p_vec_info_all: _p_vec_info_all
}
