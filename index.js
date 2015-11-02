var express = require('express');
var webduino = require('webduino-js');
var board, led;
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

board = new webduino.WebArduino('你的 Device Id');
board.on(webduino.BoardEvent.READY, function () {
  led = new webduino.module.RGBLed(board, board.getDigitalPin(6)
                                    , board.getDigitalPin(7)
                                    , board.getDigitalPin(8));
  led.setColor(0,0,255);
});

app.post('/', function (req, res) {
  console.log(req.build.status);
  var status = req.build.status;
  if(status == "SUCCESS"){
    led.setColor(255,255,255);
  }else if(status == "FAILURE"){
    led.setColor(255,255,0);
  }else{
    led.setColor(255,0,255);
  }
  res.send(status);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
