const express = require("express");
const isAuthenticated = require("../passport/auth.js");

const passport = require("passport");
module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();

  router.post("/", isAuthenticated, function (req, res) {
    console.log("THis is logout request: ", req.user);

    req.logout();
    res.sendStatus(200);
  });

  return router;
};
