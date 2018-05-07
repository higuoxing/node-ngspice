const ffi = require('ffi');

const sendChar = ffi.Callback('int', ['string', 'int', 'pointer'], 
  // callback: SendChar
  // return type: int
  // args: ['string', 'int', 'void*']
  (res, status, user_data) => {
    // do nothing
    console.log('res: ' + res + '\n');
    console.log('status: '+ status + '\n');
    console.log('user-data: ' + user_data);
  });

const sendStat = ffi.Callback('int', ['string', 'int', 'pointer'], 
  // callback: SendStat
  // return type: int
  // args: ['string', 'int', 'void*']
  (/* args */) => {
    // do nothing
  });

const BGThreadRunning = ffi.Callback('int', ['bool', 'int', 'pointer'], 
  // callback: BGThreadRunning
  // return type: int
  // args: ['bool', 'int', 'void*']
  (/* args */) => {
    // do nothing
  
  });

const controlledExit = ffi.Callback('int', ['int', 'bool', 'bool', 'int', 'pointer'], 
  // callback: ControlledExit
  // return type: int
  // args: ['int', 'bool', 'int', 'void*']
  (/* args */) => {
    // do nothing
  });

const sendData = ffi.Callback('int', ['pointer', 'int', 'int', 'pointer'],
  // callback: SendData
  // return type: int
  // args: ['pointer', 'int', 'int', 'pointer']
  (/* args */) => {
    // do nothing
  });

const sendInitData = ffi.Callback('int', ['pointer', 'int', 'pointer'], 
  // callback: SendInitData
  // return type: int
  // args: ['pointer', 'int', 'pointer']
  (/* args */) => {
    // do nothing
  });

const libngspice = ffi.Library('./libngspice', {
  // 'func-name': ['return-type', [ 'args' ]]
  'ngSpice_Init': ['int', 
    ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']],
  'ngSpice_Command': ['int', ['string']],
  'ngSpice_Circ': ['int', ['pointer']],
  'ngSpice_running': ['bool', [ /* empty args */ ]]
});

libngspice.ngSpice_Init(sendChar, sendStat, controlledExit, sendData, sendInitData, BGThreadRunning, null);
