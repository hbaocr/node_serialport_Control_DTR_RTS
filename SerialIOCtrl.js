const SerialPort = require("serialport");
// Import events module
const EventEmitter = require('events').EventEmitter;


class SerialIOCtrl extends EventEmitter {
    constructor(path) {
        super();
        this.path = path;
        // Create an EventEmitter object
        this.internal_event_control = new EventEmitter();

        this.serialport = new SerialPort(path, {
            baudRate: 2400,
            autoOpen:true,
            rtscts: false,
            // hupcl: true, 
            //xany:true,
        });
        this.serialport.on('error', function (err) {
            console.log('Error: ', err.message);
            this.emit('port_err',err.message);
        });
        this.serialport.on('open',(err)=>{

             //port.set({rts:true/false} only can take effect only when serialport already open.
            // Any call this function before port ready are rejected and not success.
            // This uRF reader require rts low to work, otherwise it is in reset state
            if (err) {
                console.error('Error opening serial port:', error);
                this.emit('port_err',err);
                return;
            }

            this.internal_event_control.on('rts',(level)=>{
                if(level){
                    this.serialport.set({rts:true},()=>{});
                }else{
                    this.serialport.set({rts:false},()=>{});
                }
            })

            this.internal_event_control.on('dtr',(level)=>{
                if(level>0){
                    this.serialport.set({dtr:true},()=>{});
                }else{
                    this.serialport.set({dtr:false},()=>{});
                }
            })

            this.emit('io_ready','io_ready');
            

        });
    }
    rts_write(lev) {
        this.internal_event_control.emit('rts',lev);
    }
    dtr_write() {
        this.internal_event_control.emit('dtr',lev);
    }

}
module.exports = SerialIOCtrl;