const express = require("express");
const db = require("../models/index");
const {roomConnection} = require("../socketGameLogic/gameLogic")



module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();
  router.post("/", jsonParser, urlencoded, (req, res) => {
    if (!req.body) {
      return res.sendStatus(500);
    }
    db.Game.findAll({ where: { name: req.body.gameName } }).then((result) => {
      //console.log(result[0]["dataValues"]);
      if (!result[0]["dataValues"]) {
        return res.sendStatus(404);
      }
      if (result[0]["dataValues"].id) {
        db.Session.findAll({
          where: {
            game_session_id: result[0]["dataValues"].id,
            users_id: req.session.passport.user,
          },
        }).then((newQueryResult) => {
          //console.log("this is newQueryResult:", newQueryResult);
          if (newQueryResult[0]) {
            //console.log("join route: ", req.body);

            roomConnection()

            

            res.sendStatus(200);
          } else {
            db.Session.create({
              game_session_id: result[0]["dataValues"].id,
              users_id: req.session.passport.user,
              points: 0,
            })
              .then((result) => {
                //console.log(result);
                //console.log("join route: ", req.body);

                roomConnection()

                res.sendStatus(200);
              })
              .catch((err) => console.log("new error: ", err));
          }
        }).catch(err => console.log("another error: ",err))
      }
    });
  });
  return router;
};
