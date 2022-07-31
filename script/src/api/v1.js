const express = require("express")
const fs = require("fs")
const app = express.Router()

app.use("*", (req, res) => {
    if(!req.query.api){
            res.send({ error: 10002, message: "api isnt valid"})
    }else{
        const user_dir = require(__dirname + "/../../urls/users")
        fs.readdirSync(use_dir)

    }
})


module.exports = app;