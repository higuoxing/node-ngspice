module.exports = {
  process_netlist: async (netlist, socket) => {
    // process submitt code
    // write netlist to file
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    const { spawn } = require('child_process');
    // ngspice subprocess
    const ngspice = spawn('ngspice', ['-p', '-r', netlist.netlist]);
    const plot_option_parser = require('./parser').plot_option_parser;
    const parse_data_line = require('./parser').parse_data_line;

    let label_info = await plot_option_parser(netlist.plot_option).catch((e) => {
      socket.emit('server-msg', { type: 'error', msg: 'Plot Option parsing error' });
    });

    /*
     * return:
     * res = {
     *   curves: [ { x: [], y: [], color: Color, name: String } ]
     * }
     * */
    let res = { curves: [], label_info: label_info.map((item) => { return item.name }) /* blank list */ };

    /*
     * parser flag
     * flag = [{
     *   direction_of_sequence: Int, // sequence
     *   value: Float,               // value
     *   value_position: Int,        // value position
     *   belong_to: Int,             // curve color will depend on this
     *   new_curve: Boolean }]       // new curve indicator
     *   active: Boolean }]          // active indicator
     * */
    let new_flags = { flags: [], total_curves: 0 };

    // write to tmp file
    await fs.writeFile(tmp_file_path + socket.id + '-test.sp',

      netlist.netlist, (err) => {
        if (err) {
          // do nothing
          console.log(err);
        }
    });

    // write plot option
    setTimeout(function() {

      try {
        ngspice.stdin.write('source ' + tmp_file_path + socket.id + '-test.sp\n');
        ngspice.stdin.write('wrdata ' + tmp_file_path + socket.id + '-test.data ' + label_info.map((item) => { return item.curve; }).join(' '));
        ngspice.stdin.end();
      } catch (e) {
        // do nothing
        console.log(e);
      }
    }, 100);

    ngspice.stdout.on('data', (data) => {
      let line = data.toString().split(/\r?\n/);

      for (let info of line) {
        if (info.toString()) {
          socket.emit('server-msg', { type: 'info', msg: info.toString() });
        } else {
          // do nothing
        }
      }
    });

    ngspice.stderr.on('data', (data) => {
      let line = data.toString().split(/\r?\n/);
      for (let info of line) {
        if (info.toString()) {
          socket.emit('server-msg', { type: 'error', msg: info.toString() });
        } else {
          // do nothing
        }
      }
    });

    // return a promise
    return new Promise((resolve, reject) => {
      ngspice.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);
        const readline = require('readline');

        let stats = fs.stat(tmp_file_path + socket.id + '-test.data', (err, stat) => {
          if (stat && stat.isFile()) {
            let rf = readline.createInterface({
             // create file read stream
             input: fs.createReadStream(tmp_file_path + socket.id + '-test.data'),
             terminal: false
            });
            rf.on('error', (err) => {
             console.log(err);
            });
            rf.on('line', (line) => {
             /* about parsing line, please refer ngspice manual: 17.5.88 Wrdata */
             if (line) {
               /*
                * flags = [{
                *   direction_of_sequence: Int, // sequence
                *   value: Float,               // value
                *   value_position: Int,        // value position
                *   belong_to: Int,             // curve color will depend on this
                *   new_curve: Boolean }]       // new curve indicator
                *   active: Boolean }]          // active indicator
                * */
               let prev_flags = new_flags;
               new_flags = parse_data_line(line, prev_flags);
               /*
                * return new_flags
                * flags = [{
                *   direction_of_sequence: Int,     // sequence
                *   value: { x: Float, y: Float },  // value
                *   value_position: Int,            // value position
                *   belong_to: Int,                 // curve color will depend on this
                *   new_curve: Boolean,             // new curve indicator
                *   active: Boolean }]              // active indicator
                * */
               for (let pair of new_flags.flags) {
                 if (pair.new_curve) {
                   // push a new curve into res.curves
                   res.curves.push({ x: [pair.value.x], y: [pair.value.y], belong_to: pair.belong_to });
                 } else {
                   // if not a new curve just add it to an existed curve
                   res.curves[pair.value_position].x.push(pair.value.x);  // push x value
                   res.curves[pair.value_position].y.push(pair.value.y);  // push y value
                 }
               }
             }
             // else do nothing
            });
            rf.on('close', () => {
             resolve(res);
            });
          } else {
            console.log(stat)
            reject();

          }
        });
      });
    });
  },
  // replace_macros
  replace_macros: async (file) => {
    const readline = require('readline');
    const fs = require('fs');
    let res = { /* empty res */ };
    return new Promise((resolve, reject) => {
      if (!file) {
        resolve({ type: 'error', msg: 'Please do not upload empty file :)' });
      }
      let stats = fs.stat(file.path, (err, stat) => {
        if (stat && stat.isFile()) {
          let rf = readline.createInterface({
            // create file read stream
            input: fs.createReadStream(file.path),
            terminal: false
          });
          rf.on('error', (err) => { console.log(err); });
          let wf = fs.createWriteStream(file.destination + file.originalname);
          rf.on('line', (line) => {
            if (line.match(/<ModelFile>/)) {
              line = line.replace(/'<ModelFile>'/, file.destination + file.originalname);
            }
            wf.write(line + '\n');
          });
          rf.on('close', () => {
            wf.close();
            res = {
              msg: 'Great! You could include this lib with path: ' + file.destination + file.originalname,
              type: 'success'
            }
            resolve(res);
          });
        } else {
          reject();
        }
      });
    });
  }
}
