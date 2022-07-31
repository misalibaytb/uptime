const { exec } = require('child_process')
const nodemon = require('nodemon')
const fs = require('fs')

x = exec("npm i")
x.on('close', function() {
    console.log("checking for updates ...")
    setTimeout(function() {
        nodemon({
            stdout: false,
            exec: "node ./update.js || node ./restart.js"
          }).on('readable', function() { // the `readable` event indicates that data is ready to pick up
            this.stderr.pipe(fs.createWriteStream(__dirname + '/err.txt'))
          })
}, 500)
})