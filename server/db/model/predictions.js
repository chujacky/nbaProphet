const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: String,
  game_id: Number,
  hTeam: String,
  hScore: Number,
  vTeam: String,
  vScore: Number,
  winner: String,
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
