'use strict'

const ffi = require('ffi');
const ref = require('ref');
const struct = require('./node-ngspice/wrapper/struct');

class NgSpice {
  // init ngspice instance
  constructor(ng_id = 0, send_data = false) {
    this._ng_id = ng_id;

    this._load_ngshared_lib();
  }

  _load_ngshared_lib() {
    console.log('233');
  }

}

const sendChar = ffi.Callback('int', ['string', 'int', 'pointer'],
  (_res, _id, _user_data) => {
    // callback: SendChar
    // return type: int
    // args: ['string', 'int', 'void*']
    return 0;
  });

const sendStat = ffi.Callback('int', ['string', 'int', 'pointer'],
  // callback: SendStat
  // return type: int
  // args: ['string', 'int', 'void*']
  (_res, _id, _user_data) => {
    // console.log(_res);
    return 0;
  });

const BGThreadRunning = ffi.Callback('int', ['bool', 'int', 'pointer'],
  // callback: BGThreadRunning
  // return type: int
  // args: ['bool', 'int', 'void*']
  (_no_bgrun, _id, _user_data) => {
    // console.log(no_bgrun);
    return 0;
  });

const controlledExit = ffi.Callback('int', ['int', 'bool', 'bool', 'int', 'pointer'],
  // callback: ControlledExit
  // return type: int
  // args: ['int', 'bool', 'int', 'void*']
  (_exit_status, _immediate, _normal_exit, _id, _user_data) => {

    return _exit_status;
  });

const sendData = ffi.Callback('int', [struct.p_vec_values_all, 'int', 'int', 'pointer'],
  // callback: SendData
  // return type: int
  // args: ['pointer', 'int', 'int', 'pointer']
  (_vdata, _res, _id, _user_data) => {
    let vdata = _vdata.deref();
    // for (let offset = 0; offset < vdata.v_count; offset ++) {
    //     console.log(ref.get(vdata.v_a, 8 * offset).deref());
    // }
    return 0;
  });

const sendInitData = ffi.Callback('int', [struct.p_vec_info_all, 'int', 'pointer'],
  // callback: SendInitData
  // return type: int
  // args: ['pointer', 'int', 'pointer']
  (_vec_info, _id, _user_data) => {
    // vdata
    let vec_info = _vec_info.deref();
    for (let offset = 0; offset < vec_info.c_vec_count; offset ++) {
      console.log(ref.get(vec_info.c_vecs, 8 * offset).deref());
    }
    return 0;
  });

const libngspice = ffi.Library('./libngspice/core/libngspice', {
  // 'func-name': ['return-type', [ 'args' ]]
  'ngSpice_Init'     : ['int'                 ,
    ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']],
  'ngSpice_Command'  : ['int'                 ,  ['string'          ]],
  'ngSpice_Circ'     : ['int'                 ,  ['pointer'         ]],
  'ngGet_Vec_Info'   : [struct.p_vector_info  ,  ['string'          ]],
  'ngSpice_running'  : ['bool'                ,  [ /* empty args */ ]],
  'ngSpice_CurPlot'  : ['string'              ,  [ /* empty args */ ]],
  'ngSpice_AllVecs'  : [ref.refType('string') ,  ['string'          ]]
});

libngspice.ngSpice_Init(sendChar, sendStat, controlledExit, sendData, sendInitData, BGThreadRunning, null);
libngspice.ngSpice_Command('source examples/4-bit-all-nand-gate-binary-adder.cir');
libngspice.ngSpice_Command('run');
console.log(libngspice.ngSpice_CurPlot());

let ng_inst = new NgSpice();
