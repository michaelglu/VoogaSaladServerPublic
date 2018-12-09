const mongoose = require("mongoose");
//Reptesentation of User in the database
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  bio: { type: String },
  followers: [{ type: String }],
  following: [{ type: String }],
  gamesCreated: [{ type: String }],
  gamesPlayed: [{ type: String }]
});

const User = mongoose.model("User", UserSchema);
module.exports = { User };
