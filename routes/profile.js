const isAuthenticated = require("../passport/auth.js");
const express = require("express");
const db = require("../models/index");
module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();

  router.post("/", isAuthenticated, async (req, res) => {
    const userProfile = await db.User.findAll({
      where: { id: req.session.passport.user },
    }).then((result) => result[0]["dataValues"]);
    const currentGames = await db.Session.findAll({
      where: { users_id: req.session.passport.user },
    }).then((result) => {
      if (result[0] == undefined) {
        return [];
      }

      return result[0]["dataValues"];
    });

    if (currentGames.game_session_id !== undefined) {
      const game = await db.Game.findAll({
        where: { id: currentGames["game_session_id"] },
      }).then((result) => {
        return result[0]["dataValues"];
      });

      userProfile.game = game;
    }

    delete userProfile.password;
    userProfile.currentGames = currentGames;

    /*       console.log('babanas: ',req.session.passport)
     */

    res.status(200).json(userProfile);
  });
  return router;
};
