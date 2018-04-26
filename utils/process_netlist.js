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
     * */
    let prev_flags = [];

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
             * */
            let new_flags = parse_data_line(line, prev_flags);

          }
          // else do nothing
          // console.log(label_info);
        }).on('close', () => {
          resolve(res);
        });
      });
    });
  },
}
