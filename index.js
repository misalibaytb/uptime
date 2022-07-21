const express = require("express")
const app = express()
const webroot = __dirname + "/public"
const fs = require("fs")
require("./url-handler")
const main = require(__dirname + "/src/main.js")
const api = require(__dirname + "/src/api.js")

app.use("/api", api)

app.listen(80)