const ngspice = require('./node-ngspice/wrapper/wrapper');

let ng_inst = new ngspice.NgSpice(0, true);

console.error(ng_inst);

// libngspice.ngSpice_Init(sendChar, sendStat, controlledExit, sendData, sendInitData, BGThreadRunning, null);
// libngspice.ngSpice_Command('source examples/4-bit-all-nand-gate-binary-adder.cir');
// libngspice.ngSpice_Command('run');
// console.log(libngspice.ngSpice_CurPlot());
//
// let ng_inst = new NgSpice();
