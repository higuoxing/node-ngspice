module.exports = {
  netlist_data_process: async (data) => {
    const process_netlist = require('../utils/process_netlist').process_netlist;
    let res = await process_netlist(data);
    return res;
  },
}
