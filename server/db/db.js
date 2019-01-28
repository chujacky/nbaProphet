const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nba', { useNewUrlParser: true }, (err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to mongoose');
});

module.exports = mongoose;
