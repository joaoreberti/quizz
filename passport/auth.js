const isAuthenticated = (req, res, next) => {
  console.log("THis is request: ", req.user);
  if (req.user) return next();
  else
    return res.status(401).json({
      error: "User not authenticated",
    });
};

module.exports = isAuthenticated;
