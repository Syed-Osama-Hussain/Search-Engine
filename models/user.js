const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const config = require('../config.json');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }, 
  history:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content"
        }
    ],
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  isAdmin: Boolean
});


userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      history: this.history,
      isAdmin: this.isAdmin
    },
    config.jwtPrivateKey
  );
  return token;
};


const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  });

  return schema.validate(user); 
}
exports.User = User;
exports.validate = validateUser;