module.exports = {
  process_netlist: async (netlist) => {
    // process submitt code
    // write netlist to file
    const fs = require('fs');
    const tmp_file_path = require('../configs/default').tmp_file_path;
    const { spawn } = require('child_process');
    const ngspice = spawn('ngspice', ['-p', '-r', netlist.netlist]);
    console.log(netlist.plot_option)
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
      console.log(data.toString());
    });

    ngspice.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    ngspice.on('close', async (code) => {
      console.log(`child process exited with code ${code}`);
      await fs.readFile(tmp_file_path + 'test.data', (err, data) => {
        if (err) throw err;
        
      });
    });

  },
}
