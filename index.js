let SerialPort = require("serialport");
var port = new SerialPort("/dev/cu.usbserial-AL00FN6X", {
    baudRate:2400,
    xany:false
});
port.on('error', function (err) {
    console.log('Error: ', err.message);
  })

function sendRTS_signal(cb,timeout_ms){
    let hdl= setTimeout(()=>{
        port.set({rts:true},()=>{
            cb();
        });
    },timeout_ms);
    return hdl;
}

function sendDTR_signal(cb,timeout_ms){
    let hdl= setTimeout(()=>{
        port.set({dtr:true},()=>{
            cb();
        });
    },timeout_ms);
    return hdl;

}

sendDTR_signal(()=>{},100)