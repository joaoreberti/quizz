const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/index");

module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();

  router.post("/", jsonParser, urlencoded, async (req, res) => {
    db.Game.create({
      active: true,
      name: req.body.gameName,
    })
      .then((result) => {
        console.log(result["dataValues"].id);
        db.Session.create({
          game_session_id: result["dataValues"].id,
          users_id: req.session.passport.user,
          points: 0,
        })
          .then((result) => {
            console.log("segundo insert", result);
            return res.sendStatus(200);
          })
          .catch((err) => {
            console.log("segundo insert error: ", err);
            return res.sendStatus(505);
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.errors[0].message === "username must be unique") {
          return res.sendStatus(405)(
            "That username already exists. Try a different one"
          );
        }
        return res.sendStatus(505);
      });
  });

  return router;
};
