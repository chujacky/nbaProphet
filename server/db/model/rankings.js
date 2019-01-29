const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  user: String,
  points: Number,
  accuracy: Number,
});

const Ranking = mongoose.model('Ranking', rankingSchema);

module.exports = Ranking;
