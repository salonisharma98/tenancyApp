const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  FullName: {
    type: String
  },
  UserId: {
    type: String,
    unique: true
  },
  Password: {
    type: String
  },
  Contact: {
    type: Number
  }
});
module.exports = mongoose.model("User", UserSchema);
