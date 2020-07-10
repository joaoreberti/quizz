const express = require("express");
const session = require("express-session");
const flash = require("express-flash");
const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencoded = bodyParser.urlencoded({ extended: false });
const initializePassport = require("./passport/config");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const isAuthenticated = require('./passport/auth.js')

initializePassport(
  passport,
  (username) => {
    return db.User.findAll({ where: { username: username } }).then(
      (result) => result[0]["dataValues"]
    );
  },
  (id) => {
    return db.User.findAll({ where: { id: id } }).then((result) => {
      return result[0]["dataValues"];
    });
  }
);

const app = express();

app.use(flash());
app.use(cors({ credentials: true, origin: ["http://localhost:3000", "http://joaoreberti.tech:5000"] }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: "cats",
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 4 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());


const loginRouter = require("./routes/login.js")(jsonParser, urlencoded, cors);
const logoutRouter = require("./routes/logout.js")(jsonParser, urlencoded, cors);

const signupRouter = require("./routes/signup.js")(jsonParser, urlencoded);
const profileRouter = require("./routes/profile.js")(jsonParser, urlencoded);

app.use("/login", loginRouter);
app.use('/signup',signupRouter )
app.use("/profile", profileRouter);
app.use("/logout", logoutRouter);

app.use("/", isAuthenticated, async (req, res, next)=> {
  res.sendStatus(200)
})


app.listen(3051, () => {
  console.log("listening on port 3051");
});

/* const tryConnection =async () => {
    const users = await db.User.findAll({where: {username: 'tsubasa'}});
    console.log("All users:", JSON.stringify(users, null, 2));


    
} 
tryConnection() */
