module.exports = {
  process_upload_file: async (file) => {
    // process uploaded file
    const replace_macros = require('./process_netlist').replace_macros;
    let res = { /* empty dict */ };
    try {
      res = await replace_macros(file);
      return res;
    } catch (e) {
      console.log(e);
      return { type: 'error', msg: 'Oops! There\'s something wrong with your code!'};
    }
  }
}
