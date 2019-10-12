let SerialPort = require("serialport");
var port = new SerialPort("/dev/cu.usbserial-AL00FN6X", {
    baudRate:2400,
    xany:true
});
port.on('error', function (err) {
    console.log('Error: ', err.message);
  })

function sendRTS_signal(cb){
    setTimeout(()=>{
        port.set({rts:true},()=>{
            cb();
        });
    },1000)
}


sendRTS_signal(()=>{
    console.log('dssd');
})
// //const SerialIO = require('./serial_cts');
// //let rts_pin = new SerialIO("/dev/cu.usbserial-AL00FN6X");
// function sendBRK(cb) {
//   console.log('going to send BRK');
//   port.set({rts: true}, function () {
//      // nextLog('BRK sent, going to delay for 16ms');
//       setTimeout(function () {
//          // nextLog('timeout , going to clear BRK');
//           port.set({rts: false}, function () {
//               //nextLog('BRK cleared, going to send data');
//               cb();//here is callBack which writes data
//           });
//       }, 16/*16.25*/);
//   });
// }
// function onData(data) {
//   if (data.length == 1 && data[0] == 0) {
//       //nextLog('received BRK');
//   } else {
//       //nextLog('received data '+toString(data));
//   }
// }

// sendBRK(function () {
//       var data = toArray('ff 55 01 01 00 01 02 00 59');
//       port.write(data, function (err) {
//           //if (!err) nextLog('data sent (' + data.length + ' bytes) ' + toString(data));
//       });
// });

// sendBRK()