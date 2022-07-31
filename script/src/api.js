const express = require("express")
const app = express.Router()
const fs = require("fs")
const v1 = require(__dirname + "/api/v1.js")

app.use("/v1", v1)


app.use("*", async (req, res) => {
    res.send({ error: 10001, message: "you went to bad url sector "})
})

module.exports = app