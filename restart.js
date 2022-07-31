const { json } = require('express')
const fs = require('fs')


fs.writeFile(__dirname + "/ds.js", JSON.stringify("j"))
// fs.unlink(__dirname + "/ds.js")

