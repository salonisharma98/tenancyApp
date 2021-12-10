const mongoose = require("mongoose");

const NewUser = new mongoose.Schema({
  photo: {
    type: Buffer
  }
});
module.exports = mongoose.model("NewUser", NewUser);
