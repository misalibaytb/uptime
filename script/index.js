// require(__dirname + "/src/script/url-handler")
const webroot = __dirname + "/public";const fs = require("fs");const main = require(__dirname + "/src/main.js");const api = require(__dirname + "/src/api.js")
const nodemon = require("nodemon");

const express = require("express")
const app = express()
const expressWs = require('express-ws')(app);
const prompt = require("prompt-sync")();
const bodyParser = require("body-parser");
let WSServer = require('ws').Server;

const http = require('http').createServer(app)
const io = require('socket.io')(http);
  io.on("connection", function connection(ws) {
    console.info(`Client connected [id=${ws.id}]`);
    ws.on("message", function incoming(message) {
    console.log(message);
    })
})



var done = 0
var to_load = 3
var basic = 3

module.exports = {
    doned: function(){
        done++
        io.on("connection", function connection(ws) {
            ws.send({
                loaded: (done / to_load * 100).toFixed(2),
                skip: done >= basic ? true : false
            })
            })
    }
}

const files = fs.readdirSync(__dirname + "/uptimer")
files.forEach(function (file) {
    to_load += 1
})
io.on("connection", function connection(ws) {
    x = setInterval(() => {
        if(done / to_load * 100 >= 99.99){
            setTimeout(() => clearInterval(x), 5000)
        }
        ws.send({
            loaded: (done / to_load * 100).toFixed(2),
            skip: done >= basic ? true : false
        })
    })
    })
setTimeout(() => {
    done++
    require(__dirname + "/run")
}, 3000)

app.use("/assets", express.static(__dirname + "/assets"));

app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    if(req.query.skip && done >= basic) {
        return next();
    }
    if(done / to_load * 100 >= 99.99){
    next()
    }else{
        res.sendFile(webroot + "/loading.html")
    }
    if(req.protocol !== "https" && req.hostname !== "localhost"){
    res.redirect("https://michlip.eu/https")
    }
})

app.get('/', function (req, res, next) {
    res.sendFile(webroot + '/index.html');
});

app.use("/api", api)

http.listen(80)