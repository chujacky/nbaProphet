const mongoose = require('mongoose');

mongoose.connect('mongodb://10.3.35.190:27017/nba', { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mongoose');
});

const db = mongoose.connection;

module.exports = db;
