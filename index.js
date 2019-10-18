//let SerialPort = require("serialport");
let IOSerial = require("./SerialIOCtrl");

let path  ="/dev/cu.usbserial-AL00FN6X";
var value = 1;
let io  = new IOSerial(path);
io.on('io_ready',(msg)=>{
    setInterval(()=>{
        value = +!value;
        io.rts_write(value);

    },1000)
})