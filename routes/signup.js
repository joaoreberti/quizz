const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models/index");

module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();

  router.post("/", jsonParser, urlencoded, async (req, res) => {
    console.log(req.body);
    
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      console.log(hashedPass);
      db.User.create({
        username: req.body.username,
        avatar_url: req.body.avatarUrl,
        password: hashedPass,
      })
        .then((result) => {
          console.log(result)
          return res.sendStatus(200)
        })
        .catch((err) => {
          console.error("aqui começa o erro:\n", err.errors[0].message);
          if (err.errors[0].message === "username must be unique") {
            return res.sendStatus(405)(
              "That username already exists. Try a different one"
            );
          }
          return res.sendStatus(505);
        });
    } catch {
      console.log("did not work");
      return res.sendStatus(404);
    }
  });

  return router;
};
