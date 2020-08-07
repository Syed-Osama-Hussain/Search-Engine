const jwt = require("jsonwebtoken");
const config = require("../config.json")

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if(token)
  {    
    let user = jwt.verify(token,config.jwtPrivateKey)
    if (!user.isAdmin) return res.status(403).send("Access denied.");
  }else{
    return res.status(400).send("You need to be logged in to do that.");
  }

  next();
};