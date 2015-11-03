# webWhistle

使用webduino 仿製 Yahoo CI Build 氣球燈

Yahoo 
https://www.youtube.com/watch?v=2ygPkb8KW70&feature=youtu.be&t=3m4s


## Demo
<img src="http://giant.gfycat.com/HilariousFreshAntarcticgiantpetrel.gif">

## 建置
1. 手邊備有一組 webduino
2. 然後把你的三色LED插好，如下圖(示例圖轉自[Webduino](https://webduino.io/tutorials/tutorial-03-rgbled.html))
    - <img src="https://webduino.io/img/tutorials/tutorial-03-02.jpg">
2. clone 該專案
3. 設定 `你的 Device Id`
4. 如果你有裝 node 可以直接 `npm i && npm start` ， 如果你有裝 Docker 可以直接 `docker-compose up` 起來
5. 到 Jenkins 安裝一個 `Notification Plugin` 的 Plugin
6. 進去專案把 `Job Notifications` 的 URL 設定你架 webduino 的 Domain

## 更多詳細教學
http://fuyaode.logdown.com/posts/307521-webduino-jenkins-build-an-entity-status
