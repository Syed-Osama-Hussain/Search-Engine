const jwt = require("jsonwebtoken");
const config = require('../config.json');

module.exports = function(req, res, next) {
  
  if (!req.session.token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(req.session.token, config.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
