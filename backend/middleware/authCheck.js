const jwt = require("jsonwebtoken");
const config = require('../config.json');

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    next();
  }
};
