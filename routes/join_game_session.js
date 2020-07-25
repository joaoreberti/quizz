const express = require("express");
const db = require("../models/index");
var io = require("socket.io")(3052);

module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();
  router.post("/", jsonParser, urlencoded, (req, res) => {
    if (!req.body) {
      return res.sendStatus(500);
    }
    db.Game.findAll({ where: { name: req.body.gameName } }).then((result) => {
      console.log(result["dataValues"]);
      if (result[0]["dataValues"].id) {
        console.log("join route: ", req.body);

        io.sockets.on("connection", (socket) => {
          socket.on("joinRoom", (room) => {
            console.log("loggin room: ", room);
            socket.join(room);
            io.to(room).emit("test log", "hello world!");
          });
        });

        res.sendStatus(200);
      }
    });
  });
  return router;
};
