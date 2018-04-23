module.exports = {
  process_netlist: async (netlist) => {
    // process submitt code
    // write netlist to file
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    const { spawn } = require('child_process');
    const ngspice = spawn('ngspice', ['-p', '-r', netlist.netlist]);

    let res = {
      t: [],
      x0: [],
      x1: []
    };

    await fs.writeFile(tmp_file_path + 'test.sp',
      netlist.netlist,
      (err) => {
        if (err) throw err;
    });

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

    return new Promise((resolve, reject) => {
      ngspice.on('close', async (code) => {
        console.log(`child process exited with code ${code}`);
        const readline = require('readline');
        readline.createInterface({
          input: fs.createReadStream(tmp_file_path + 'test.data'),
          terminal: false
        }).on('line', (line) => {
          let arr = line.split('  ');
          res.t.push(arr[0]);
          res.x0.push(arr[1]);
          res.x1.push(arr[3]);
        }).on('close', () => {
          resolve(res);
        });
      });
    });
  },
}
