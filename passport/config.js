const { authenticate } = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByUserName, getUserByid) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUserName(username);
    if (user == null) {
      return done(null, false, { message: "No user with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user, { message: "success" });
      } else {
        return done(null, false, { message: "Combination incorrect" });
      }
    } catch {}
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
/*     console.log("deserializeUser", id);
 */
    done(null, getUserByid(id));
  });
}

module.exports = initialize;
