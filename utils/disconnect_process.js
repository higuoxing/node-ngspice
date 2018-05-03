module.exports = {
  disconnect_process: async (socket) => {
    // delete all files of this id
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    try {
<<<<<<< HEAD
=======
      // delte sp file
>>>>>>> master
      await fs.unlink(tmp_file_path + socket.id + '-test.sp', (err) => {
        if (err) {
          console.log(err);
        }
      });
<<<<<<< HEAD
      await fs.unlink(tmp_file_path + socket.id + '-test.data', (err) => {
        if (err) {
          console.log(err);  
=======
      // delete lib files
      // FIXME: add
      
      // delete data file
      await fs.unlink(tmp_file_path + socket.id + '-test.data', (err) => {
        if (err) {
          console.log(err);
>>>>>>> master
        }
      });
    } catch (e) {
      // do nothing
      console.log(e);
<<<<<<< HEAD

    }

=======
    }
>>>>>>> master
  }
}
