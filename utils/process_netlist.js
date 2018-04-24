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
    let res = { curve: label_info.y_label.length, x: []/* blank dict */ };

    // init res;
    for (var i = 0; i < label_info.y_label.length; i ++) {
      res['y_' + i.toString()] = [];
    }

    // write to tmp file
    await fs.writeFile(tmp_file_path + 'test.sp',
      netlist.netlist,
      (err) => {
        if (err) throw err;
    });

    // write plot option
    setTimeout(function() {
        ngspice.stdin.write('source ' + tmp_file_path + 'test.sp\n');
        ngspice.stdin.write('wrdata ' + tmp_file_path + 'test.data ' + netlist.plot_option);
        ngspice.stdin.end();
    }, 100);

    ngspice.stdout.on('data', (data) => {
      // console.log(data.toString());
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
          input: fs.createReadStream(tmp_file_path + 'test.data'),
          terminal: false
        }).on('line', (line) => {
          let arr = parse_data_line(line);
          // x-axis
          res.x.push(arr[0]);
          // y_axis
          for (var i = 0; i < arr.length / 2; i ++) {
            res['y_' + i.toString()].push(arr[2*i+1]);
          };
          // console.log(label_info);
        }).on('close', () => {
          resolve(res);
        });
      });
    });
  },
}