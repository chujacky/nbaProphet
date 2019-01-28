const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  user: String,
  game_id: Number,
  hScore: Number,
  vScore: Number,
});

const Prediction = mongoose.model('Prediction', predictionSchema);

module.exports = Prediction;
