const express = require("express");
const passport = require("passport");
module.exports = (jsonParser, urlencoded) => {
  const router = express.Router();

  router.post(
    "/",
    jsonParser,
    urlencoded,
    passport.authenticate("local"),
    function (req, res) {
      req.logIn(req.user, () => {});
      // If this function gets called, authentication was successful.
      // `req.user` contains the authenticated user.
      delete req.user.password;
      res.sendStatus(200);
    }
  );

  return router;
};
