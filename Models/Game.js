const mongoose = require("mongoose");
//Representation of Game in database
const GameSchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  config: {
    mapWidth: { type: Number, required: true },
    mapHeight: { type: Number, required: true },
    actors: { type: String, required: true },
    messages: { type: String, required: true },
    prototypes: { type: String, required: true }
  }
});

const Game = mongoose.Model("Game", GameSchema);
module.exports = Game;
