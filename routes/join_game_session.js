const express = require("express");

module.exports = (jsonParser, urlencoded) => {

    const router = express.Router();
    router.post('/', (req,res)=>{
        console.log('join route: ', req.body)


        var io = require("socket.io")(3052);

        io.on("connection", (socket) => {
          console.log("a user connected");
        });
        res.sendStatus(200)
    })
    return router
}

