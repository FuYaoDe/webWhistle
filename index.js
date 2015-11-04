var express = require('express');
var webduino = require('webduino-js');
var board, led;
var app = express();
var bodyParser = require('body-parser');
var config ={
  redPin: 6,
  greenPin: 10,
  bluePin: 9
}
var color = {
  r: 0,
  g: 0,
  b: 0,
  useBreathe: false
}
var time;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


board = new webduino.WebArduino('你的device id');
board.on(webduino.BoardEvent.READY, function () {
  led = new webduino.module.RGBLed(board, board.getDigitalPin(config.redPin)
                                    , board.getDigitalPin(config.bluePin)
                                    , board.getDigitalPin(config.greenPin));
  setColor(0,0,240);
});

app.post('/', function (req, res) {
  console.log(req.body.build.status);
  clearTimeout(time);
  var status = '';
  status = req.body.build.status;
  if(status == "SUCCESS"){
    changeStatus(status);
    // setColor(255,255,255,status);
  }else if(status == "FAILURE"){
    changeStatus(status);
    // setColor(255,255,0,status);
  }else{
    changeStatus(status);
    // setColor(255,0,255,status);
  }
  res.send(status);
});

function ledBreathe(status,isUP){
  switch (status) {
    case "SUCCESS":
      if(isUP){
        if(color.r <=245){
          color.r += 5;
          if(color.g <=245)
            color.g += 5;
          if(color.b <=245)
            color.b += 5;
        }else{
          isUP = false;
        }
      }else{
        if(color.r >=50){
          color.r -= 5;
          if(color.g >=50)
            color.g -= 5;
          if(color.b >=50)
            color.b -= 5;
        }else{
          isUP = true;
        }
      }
      break;
    case "FAILURE":
      if(isUP){
        if(color.r <=245){
          color.r += 5;
          if(color.g <=245)
            color.g += 5;
        }else{
          isUP = false;
        }
      }else{
        if(color.r >=50){
          color.r -= 5;
          if(color.g >=50)
            color.g -= 5;
        }else{
          isUP = true;
        }
      }
      break;
    case "":
      if(isUP){
        if(color.r <=245){
          color.r += 5;
          if(color.b <=245)
            color.b += 5;
        }else{
          isUP = false;
        }
      }else{
        if(color.r >=50){
          color.r -= 5;
          if(color.b >=50)
            color.b -= 5;
        }else{
          isUP = true;
        }
      }
      break;

  }
  led.setColor(color.r,color.g,color.b)
  console.log(color.r,color.g,color.b)
  time = setTimeout(function(){ledBreathe(status,isUP);}, 50);
}

function changeStatus(status) {
  var isStop = false;
  switch (status) {
    case "SUCCESS":
      if(color.r <= 245)
        color.r += 5;
      if(color.g <= 245)
        color.g += 5;
      if(color.b <= 245)
        color.b += 5;
      if(!((color.r > 245 && color.g > 245) && (color.g > 245 && color.b > 245) && (color.b > 245 && color.r > 245)))
        time = setTimeout(function(){changeStatus(status);}, 50);
      else {
        isStop = true;
      }
      break;
    case "FAILURE":
      if(color.r <= 245)
        color.r += 5;
      if(color.g <= 245)
        color.g += 5;
      if(color.b >= 15)
        color.b -= 5;
      if(!((color.r > 245 && color.g > 245) && (color.g > 245 && color.b) < 15 && (color.b < 15 && color.r > 245)))
        time = setTimeout(function(){changeStatus(status);}, 50);
      else {
        isStop = true;
      }
      break;
    case "":
      if(color.r <= 245)
        color.r += 5;
      if(color.g >= 15)
        color.g -= 5;
      if(color.b <= 245)
        color.b += 5;
      if(!((color.r > 245 && color.g < 15) && (color.g < 15 && color.b > 245) && (color.b > 245 && color.r > 245)))
        time = setTimeout(function(){changeStatus(status);}, 50);
      else {
        isStop = true;
      }
      break;
  }
  led.setColor(color.r,color.g,color.b)
  console.log(color.r,color.g,color.b)
  if(isStop)
    ledBreathe(status,false);
}

function ledColor(r,g,b) {
  color.r = r;
  color.g = g;
  color.b = b;
  console.log("color",r,g,b)
  led.setColor(r,g,b);
}

function setColor(r,g,b,status){
  if(config.useBreathe){
    ledBreathe(r,g,b,status);
  }else{
    ledColor(r,g,b);
  }
}


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
});
