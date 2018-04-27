module.exports = {
  process_netlist: async (netlist) => {
    // process submitt code
    // write netlist to file
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    const { spawn } = require('child_process');
    // ngspice subprocess
    const ngspice = spawn('ngspice', ['-p', '-r', netlist.netlist]);
    const plot_option_parser = require('./parser').plot_option_parser;
    const parse_data_line = require('./parser').parse_data_line;
    let label_info = plot_option_parser(netlist.plot_option);

    /*
     * return:
     * res = {
     *   curves: [ { x: [], y: [], color: Color, name: String } ]
     * }
     * */
    let res = { curves: [] /* blank list */ };

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
    await fs.writeFile(tmp_file_path + 'test.sp',
      netlist.netlist,
      (err) => {
        if (err) throw err;
    });

    // write plot option
    setTimeout(function() {
        ngspice.stdin.write('source ' + tmp_file_path + 'test.sp\n');
        ngspice.stdin.write('wrdata ' + tmp_file_path + 'test.data ' + label_info.y_label.join(' '));
        ngspice.stdin.end();
    }, 100);

    ngspice.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    ngspice.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    // return a promise
    return new Promise((resolve, reject) => {
      ngspice.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);
        const readline = require('readline');
        readline.createInterface({
          // create file read stream
          input: fs.createReadStream(tmp_file_path + 'test.data'),
          terminal: false
        }).on('line', (line) => {
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
        }).on('close', () => {
          resolve(res);
        });
      });
    });
  },
}
