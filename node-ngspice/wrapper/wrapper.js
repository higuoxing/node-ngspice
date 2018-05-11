const ffi = require('ffi');
const ref = require('ref');
const ref_struct = require('ref-struct');
const struct = require('./struct');
const path = require('path');
const version = require('../../utils/platform/platform-config').version;

class NgSpice {

  // initialization
  constructor(ng_inst_id = 0, send_data = false) {
    // instance id for parallel computing
    // currently not supported
    this.ng_inst_id = ng_inst_id;

    // load shared lib
    this.ngspice = this._ngshared_lib();

    // init ngspice
    this._init_ngspice(send_data);

  }

  // load ngspice lib
  _ngshared_lib() {
    // return ngspice shared library
    let ngspice_shared_path = __dirname + '/../../libngspice/core/';
    if (version.os_version === 'darwin') {
      ngspice_shared_path += 'libngspice\.dylib'
    }
    return this._load_ngshared_lib(ngspice_shared_path);
  }
  // get _ngshared_lib() ends

  // load ngspice shared library
  _load_ngshared_lib(path) {

    // judge platform and search for lib
    try {
      return ffi.Library(path, struct.methods_structure);
    } catch (e) {
      throw Error(`cannot open ${path} for ngspice shared library, due to error: ${e}`);
    }
  }
  // _load_ngshared_lib() ends

  // init ngspice instance
  _init_ngspice(send_data) {

    // static methods
    this._send_char = ffi.Callback('int', ['string', 'int', 'pointer'],
      (_msg, _ng_id, _user_data) => {
        return 0;
      });

    this._send_stat = ffi.Callback('int', ['string', 'int', 'pointer'],
      (_msg, _ng_id, _user_data) => {
        return 0;
      });

    if (send_data) {
      this._send_data = ffi.Callback('int', [struct.p_vec_values_all, 'int', 'int', 'pointer'],
        // callback: SendData
        // return type: int
        // args: ['pointer', 'int', 'int', 'pointer']
        (_vdata, _msg, _ng_id, _user_data) => {
          let vdata = _vdata.deref();
          // for (let offset = 0; offset < vdata.v_count; offset ++) {
          //     console.log(ref.get(vdata.v_a, 8 * offset).deref());
          // }
          return 0;
        });
    } else {
      this._send_data = null;
    }

    this._send_init_data = ffi.Callback('int', [struct.p_vec_info_all, 'int', 'pointer'],
      // callback: SendInitData
      // return type: int
      // args: ['pointer', 'int', 'pointer']
      (_vec_info, _ng_id, _user_data) => {
        // vdata
        let vec_info = _vec_info.deref();
        // for (let offset = 0; offset < vec_info.c_vec_count; offset ++) {
        //   console.log(ref.get(vec_info.c_vecs, 8 * offset).deref());
        // }
        return 0;
      });

    this._bg_thread_running = ffi.Callback('int', ['bool', 'int', 'pointer'],
      // callback: BGThreadRunning
      // return type: int
      // args: ['bool', 'int', 'void*']
      (_no_bgrun, _ng_id, _user_data) => {
        // console.log(no_bgrun);
        return 0;
      });

    this._controlled_exit = ffi.Callback('int', ['int', 'bool', 'bool', 'int', 'pointer'],
      // callback: ControlledExit
      // return type: int
      // args: ['int', 'bool', 'int', 'void*']
      (_exit_status, _immediate, _normal_exit, _id, _user_data) => {
        return _exit_status;
      });
    // static methods ends


  }
  // _init_ngspice() ends

}
// class NgSpice ends

module.exports = {
  NgSpice: NgSpice
}
