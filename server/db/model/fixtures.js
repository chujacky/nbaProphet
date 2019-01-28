const mongoose = require('mongoose');

const fixtureSchema = new mongoose.Schema({
  game_id: Number,
  hTeam: String,
  vTeam: String,
});

const Fixture = mongoose.model('Fixture', fixtureSchema);

module.exports = Fixture;
