const mongoose = require("mongoose");

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


const User = mongoose.model("User", userSchema);


exports.User = User;
