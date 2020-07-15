const express = require("express");

module.exports = (jsonParser, urlencoded) => {

    const router = express.Router();
    router.post('/',jsonParser, urlencoded, (req,res)=>{
        console.log('join route: ', req.body)


        var io = require("socket.io")(3052);

        io.sockets.on("connection", (socket) => {
          console.log(socket);
          socket.on('joinRoom', (room) => {
            console.log('loggin room: ','bananas')
            socket.join('bananas');
          });
        });
       
        /* io.to('some room').emit('some event'); */

        res.sendStatus(200)
    })
    return router
}

