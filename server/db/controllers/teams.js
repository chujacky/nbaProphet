const Team = require('../model/teams');

const create = (teams) => {
  Team.insertMany(teams, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const read = (req, res) => {
  Team.find({}, (err, teams) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(teams);
  });
};

module.exports = {
  create,
  read,
};
