const ffi = require('ffi');
const ref = require('ref');
const ref_struct = require('ref-struct');
const struct = require('./wrapper/struct');

const sendChar = ffi.Callback('int', ['string', 'int', 'pointer'],
  // callback: SendChar
  // return type: int
  // args: ['string', 'int', 'void*']
  (res, id, user_data) => {
    if (res.match(/stdout/)) {
      // console.log(res.replace(/stdout\ /, ''));
    } else {
      // console.log('error');
      // console.log(res.replace(/stderr\ /, ''));
    }
    return 0;
  });

const sendStat = ffi.Callback('int', ['string', 'int', 'pointer'],
  // callback: SendStat
  // return type: int
  // args: ['string', 'int', 'void*']
  (res, id, user_data) => {
    // console.log(res);
    return 0;
  });

const BGThreadRunning = ffi.Callback('int', ['bool', 'int', 'pointer'],
  // callback: BGThreadRunning
  // return type: int
  // args: ['bool', 'int', 'void*']
  (no_bgrun, id, pointer) => {
    // console.log(no_bgrun);
    return 0;
  });

const controlledExit = ffi.Callback('int', ['int', 'bool', 'bool', 'int', 'pointer'],
  // callback: ControlledExit
  // return type: int
  // args: ['int', 'bool', 'int', 'void*']
  (exit_status, immediate, normal_exit, id, user_data) => {
    // console.log(exit_status);
    // console.log(immediate);
    // console.log(normal_exit);
    return exit_status;
  });

const sendData = ffi.Callback('int', [struct.p_vec_values_all, 'int', 'int', 'pointer'],
  // callback: SendData
  // return type: int
  // args: ['pointer', 'int', 'int', 'pointer']
  (_vdata, res, id, user_data) => {
    // let vdata = _vdata.deref();
    // console.log(vdata.vecsa.deref().deref());
    return 0;
  });

const sendInitData = ffi.Callback('int', [struct.p_vec_info_all, 'int', 'pointer'],
  // callback: SendInitData
  // return type: int
  // args: ['pointer', 'int', 'pointer']
  (_vec_info, id, user_data) => {
    // vdata
    let vec_info = _vec_info.deref();
    // console.log(vec_info);
    console.log(vec_info)
    return 0;
  });

const libngspice = ffi.Library('./libngspice/libngspice', {
  // 'func-name': ['return-type', [ 'args' ]]
  'ngSpice_Init': ['int',
    ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']],
  'ngSpice_Command': ['int', ['string']],
  'ngSpice_Circ': ['int', ['pointer']],
  'ngSpice_running': ['bool', [ /* empty args */ ]]
});

libngspice.ngSpice_Init(sendChar, sendStat, controlledExit, sendData, sendInitData, BGThreadRunning, null);
libngspice.ngSpice_Command('source ./test.cir');
// libngspice.ngSpice_Command('run');
libngspice.ngSpice_Command('run');
