const Fixture = require('../model/fixtures');

const create = (data) => {
  console.log(data);
  const fixtures = data.map((fixture) => {
    const gameInfo = {
      game_id: fixture.gameId,
      hTeam: fixture.hTeam.triCode,
      vTeam: fixture.vTeam.triCode,
    };
    return gameInfo;
  });
  // console.log(fixtures);
  Fixture.insertMany(fixtures, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

const read = (req, res) => {
  Fixture.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(result);
    res.status(200).send(result);
  });
};

module.exports = {
  create,
  read,
};
