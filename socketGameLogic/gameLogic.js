var io = require("socket.io")(3052);
let db = require("../models/index");
function roomConnection() {
  io.sockets.on("connection", (socket) => {
    socket.on("joinRoom", (room) => {
      console.log("loggin room: ", room);
      socket.join(room);
      io.to(room).emit("test log", "hello world!");
      socket.on("getPlayers", (room) => {
        db.Game.findAll({
          where: {
            name: room,
          },
        }).then((result) => {
            game_session_id = result[0].dataValues.id 
            db.Session.findAll({where: {game_session_id : game_session_id}})
            .then(result => {

                console.log("get players result ", result)
                result.map(player => {
                    console.log("this is player data :", player.dataValues)

                  /*   db.User.findAll({where: {
                        id : 

                    }}).then(users => {
                       return  users
                    }) */

                })
                    

            }).catch(err => { console.log("get players second query error", err)})

          
        }).catch(err => console.log("getPlayers error: ", err));
      });
    });
  });
}

module.exports = { roomConnection };
