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
      ngspice_shared_path += 'libngspice\.dylib';
    } else if (version.os_version === 'linux') {
      ngspice_shared_path += 'libngspice\.so';
    } else if (version.os_version === 'win32') {
      ngspice_shared_path += 'libngspice\.dll';
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
    this._send_char         = ffi.Callback('int', ['string', 'int', 'pointer']              , struct.send_char_c);
    this._send_stat         = ffi.Callback('int', ['string', 'int', 'pointer']              , struct.send_stat_c);
    this._send_init_data    = ffi.Callback('int', [struct.p_vec_info_all, 'int', 'pointer'] , struct.send_init_data_c);
    this._bg_thread_running = ffi.Callback('int', ['bool', 'int', 'pointer']                , struct.bg_thread_running_c);
    this._controlled_exit   = ffi.Callback('int', ['int', 'bool', 'bool', 'int', 'pointer'] , struct.controlled_exit_c);

    if (send_data) {
      this._send_data = ffi.Callback('int', [struct.p_vec_values_all, 'int', 'int', 'pointer'], struct.send_data_c);
    } else {
      this._send_data = ffi.Callback('int', [struct.p_vec_values_all, 'int', 'int', 'pointer'], null);
    }


    // initialize ngspice
    let status = this.ngspice.ngSpice_Init(
      this._send_char,
      this._send_stat,
      this._controlled_exit,
      this._send_data,
      this._send_init_data,
      this._bg_thread_running,
      null);

    if (status != 0) {
      throw Error(`ngspice initialization returned ${status}`);
    }

    
    // ngSpice_Init_Sync will be implemented later for parallel computing

  }
  // _init_ngspice() ends

}
// class NgSpice ends

module.exports = {
  NgSpice: NgSpice
}
