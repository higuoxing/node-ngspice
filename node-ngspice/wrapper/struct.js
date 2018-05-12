const ref = require('ref');
const c_struct = require('ref-struct');


const _ng_complex = c_struct({
  // complex number struct
  // you should know this!
  'ng_real' : 'double',
  'ng_imag' : 'double'
});


const _vector_info = c_struct({
  // vector  name : name of this vector
  // vector  type :
  // vector  flag :
  // real    data : real number array
  // complex data : complex number array
  // array length : vector length
  'v_name'        : 'string',
  'v_type'        : 'int',
  'v_flags'       : 'short',
  'v_real_arr'    : ref.refType('double'),
  'v_comp_arr'    : ref.refType(_ng_complex),
  'v_length'      : 'int'
});
const _p_vector_info = ref.refType(_vector_info);


const _vec_info = c_struct({
  // v_index     : index of this vector
  // v_name      : the name of this vector
  // v_is_real   : indicate if this vector is a complex vector
  // v_pd        :
  // v_pd_scale  :
  'v_index'      : 'int',
  'v_name'       : 'string',
  'v_is_real'    : 'bool',
  'v_pd'         : ref.refType('void'),
  'v_pd_scale'   : ref.refType('void')
});
const _p_vec_info = ref.refType(_vec_info);


const _vec_info_all = c_struct({
  // c_name      : name of this circuit
  // c_title     : circuit of this circuit
  // c_date      : date of this simulation
  // c_type      : simulation type
  // c_vec_count : the number of vectors could get in this plot
  // c_vecs      : vectors
  'c_name'       : 'string',
  'c_title'      : 'string',
  'c_date'       : 'string',
  'c_type'       : 'string',
  'c_vec_count'  : 'int',
  'c_vecs'       : ref.refType(_p_vec_info)
});
const _p_vec_info_all = ref.refType(_vec_info_all);


const _vec_values = c_struct({
  // p_name        : name of this point
  // p_real        : real part of this point
  // p_imag        : image part of this point
  // p_is_scale    :
  // p_is_complex  : indicate if this point is a complex point
  'p_name'         : 'string',
  'p_real'         : 'double',
  'p_imag'         : 'double',
  'p_is_scale'     : 'bool',
  'p_is_complex'   : 'bool'
});
const _p_vec_values = ref.refType(_vec_values);


const _vec_values_all = c_struct({
  // veccount : numbers of vectors
  // vecindex : vecindex
  // vecsa    :
  'v_count'   : 'int',
  'v_index'   : 'int',
  'v_a'       : ref.refType(_p_vec_values),
});
const _p_vec_values_all = ref.refType(_vec_values_all);


// static methods
const _methods_structure = {
  // 'func-name': ['return-type', [ 'args' ]]
  'ngSpice_Init'     : ['int'                 ,
    ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']],
  'ngSpice_Command'  : ['int'                 ,  ['string'          ]],
  'ngSpice_Circ'     : ['int'                 ,  ['pointer'         ]],
  'ngGet_Vec_Info'   : [_p_vector_info        ,  ['string'          ]],
  'ngSpice_running'  : ['bool'                ,  [ /* empty args */ ]],
  'ngSpice_CurPlot'  : ['string'              ,  [ /* empty args */ ]],
  'ngSpice_AllPlots' : ['string'              ,  [ /* empty args */ ]],
  'ngSpice_AllVecs'  : [ref.refType('string') ,  ['string'          ]],
  'ngSpice_SetBkpt'  : ['bool'                ,  [ /* empty args */ ]]
}

function _send_char_c(_msg, _ng_id, _user_data) {
  console.log(_msg);
  return ((msg) => { console.log(msg); return 0; })(_msg);
}


function _send_stat_c(_msg, _ng_id, _user_data) {

  return 0;
}


function _send_data_c(_vdata, _msg, _ng_id, _user_data) {
  let vdata = _vdata.deref();
  return 0;
}


function _send_init_data_c(_vec_info, _ng_id, _user_data) {
  // vdata
  let vec_info = _vec_info.deref();
  // for (let offset = 0; offset < vec_info.c_vec_count; offset ++) {
  //   console.log(ref.get(vec_info.c_vecs, 8 * offset).deref());
  // }
  return 0;
}


function _bg_thread_running_c(_no_bgrun, _ng_id, _user_data) {
  // console.log(no_bgrun);
  return 0;
}


function _controlled_exit_c(_exit_status, _immediate, _normal_exit, _id, _user_data) {
  return _exit_status;
}

// typedef int (GetVSRCData)(double*, double, char*, int, void*);
// typedef int (GetISRCData)(double*, double, char*, int, void*);
// typedef int (GetSyncData)(double, double*, double, int, int, int, void*);

// int  ngSpice_Init_Sync(GetVSRCData* vsrcdat, GetISRCData* isrcdat, GetSyncData* syncdat, int* ident, void* userData);
//

module.exports = {

  // data structs
  p_vec_values_all    : _p_vec_values_all    ,
  p_vector_info       : _p_vector_info       ,
  p_vec_info_all      : _p_vec_info_all      ,
  methods_structure   : _methods_structure   ,

  // static methods
  send_char_c         : _send_char_c         ,
  send_stat_c         : _send_stat_c         ,
  send_data_c         : _send_data_c         ,
  send_init_data_c    : _send_init_data_c    ,
  bg_thread_running_c : _bg_thread_running_c ,
  controlled_exit_c   : _controlled_exit_c   
}
