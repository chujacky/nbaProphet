const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  game_id: Number,
  hTeam: String,
  hScore: Number,
  vTeam: String,
  vScore: Number,
  winner: String,
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
