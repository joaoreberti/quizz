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
        })
          .then((result) => {
            game_session_id = result[0].dataValues.id;
            db.Session.findAll({ where: { game_session_id: game_session_id } })
              .then((result) => {
                console.log("get players result ", result);

                let userPromises = result.map(function (player) {
                  console.log(
                    "this is player data :",
                    player.dataValues.users_id
                  );

                  return db.User.findAll({
                    where: {
                      id: player.dataValues.users_id,
                    },
                  }).then((user) => {
                    return user;
                  });
                });
                Promise.all(userPromises).then(function (users) {
                  console.log("this is all users", users);
                  users;
                  let newData = users.map((data) => {
                    delete data[0].dataValues.password;
                    return data[0].dataValues;
                  });
                  console.log(newData);
                  io.to(room).emit("playerData", newData);
                });
              })
              .catch((err) => {
                console.log("get players second query error", err);
              });
          })
          .catch((err) => console.log("getPlayers error: ", err));
      });
    });
  });
}

module.exports = { roomConnection };
