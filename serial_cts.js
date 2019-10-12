let SerialPort = require("serialport");

class HandleControlCTS {
    constructor(path){
        this.path = path;
        this.port = new SerialPort(path, {
            baudRate: 2400,
            //autoOpen:true,
            rtscts: true,
            // hupcl: true, 
            //xany:true,
        });
        this.port.on('error', function (err) {
            console.log('Error: ', err.message);
          })
    }
    turn_off(){
        this.hdl = setInterval(()=>{
            this.port.set({rts:true},()=>{});
        },1000)
    }
    turn_on(){
        clearInterval(this.hdl);
    }
    
}
module.exports=HandleControlCTS;