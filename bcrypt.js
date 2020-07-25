const db = require("./models/index");

db.User.sync();
db.Game.sync();
db.Session.sync();

