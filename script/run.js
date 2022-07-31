const fs = require("fs")
const files = fs.readdirSync(__dirname + "/uptimer")
const index = require(__dirname + "/index.js")
var i = 0

files.forEach(function (filename) {
    i++
    try {
    var file
    file = JSON.parse(fs.readFileSync(__dirname + "/uptimer/" + filename, "utf8"))
    setInterval(() => file = JSON.parse(fs.readFileSync(__dirname + "/uptimer/" + filename, "utf8")), 60000)
    function start() {

        setTimeout(() => start(), file.time)
    }
} catch (e) {
}
})
for (var i = 0; i < files.length; i++) {
    setTimeout(() => index.doned(), i * 100)
}