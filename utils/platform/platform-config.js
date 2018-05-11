const os = require('os');

class v_checker {
  constructor() {
    // os platform
    this.os_version = this._os_version;
    this.ng_version = this._ng_version;
  }

  get _os_version() {
    let os_platform = os.platform();
    if (os_platform === 'darwin' || 'linux') {
      return os_platform;
    } else if (os_platform === 'win32') {
      throw Error(`sorry, {os_platform} currently not supported!`);
    }
  }

  get _ng_version() {
    // FIXME: get ngspice shared library version
    return '27';
  }
}

const version = () => {
  let checker = new v_checker();
  return checker;
}

module.exports = {
  version: version()
}
