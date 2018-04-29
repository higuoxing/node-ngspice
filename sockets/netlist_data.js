module.exports = {
  netlist_data_process: async (data, socket) => {
    const process_netlist = require('../utils/process_netlist').process_netlist;
    let res = await process_netlist(data, socket);
    return res;
  },
}
