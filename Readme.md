# Document to control dtr/rts get from the old documents

https://gitlab.cba.mit.edu/pub/mods/tree/187aed54b6be97c6f6ef5fe995aaf4a7c7d118a0/js/node_modules/serialport


## Important Note:

* **port.set({rts:true/false}** only can take effect **only when serialport already open**.Any call this function before port ready are rejected and not success.
* To triggered these pin, check port isOpen. if port is ready --> call the **port.set** function. If not, any calls is no meaning and do not take effect on pin
* The most popular ways to make sure the the **port.set** function successful is : call this in on 'open' event.
```
port.on('open',(err)=>{
  console.log('open');
  //Set rts low when port open
  port.set({rts:false},()=>{});
});

```


