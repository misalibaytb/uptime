const { response } = require('express');
const fetch = require('node-fetch');
const { exec } = require('child_process')

console.log("connecting to the server")
fetch("httpds://api.michlip.eu/uptime/version").then(res => response.jsonp()).then(data => {
    console.log(data);
}).catch(err => {
    console.log("server is not responding skipping version update")
    require(__dirname + '/script/index.js')
})