const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
const options = { useNewUrlParser: true };
mongoose.connect(
  "PRIVATE_KEY",
  options
);

module.exports = { mongoose };
