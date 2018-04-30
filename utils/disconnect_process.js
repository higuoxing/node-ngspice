module.exports = {
  disconnect_process: async (socket) => {
    // delete all files of this id
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    await fs.unlink(tmp_file_path + socket.id + '-test.sp', (err) => {
      if (err) {
        console.log(err);
      }
    });
    await fs.unlink(tmp_file_path + socket.id + '-test.data', (err) => {
      console.log(err);
    });
  }
}
