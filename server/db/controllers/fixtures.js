const axios = require('axios');
const moment = require('moment');
const Fixture = require('../model/fixtures');

const create = (data, cb) => {
  const fixtures = data.map((fixture) => {
    console.log(fixture.hTeam.triCode);
    const gameInfo = {
      game_id: Number(fixture.gameId),
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
    cb();
  });
};

const read = (req, res) => {
  Fixture.find({}, (err, result) => {
    if (err) {
      console.log(err);
    }
    // console.log(result);
    if (!result.length) {
      const day = moment().format('YYYYMMDD');
      axios.get(`http://data.nba.net/prod/v1/${day}/scoreboard.json`)
        .then((response) => {
          create(response.data.games, () => {
            read(req, res);
          });
        })
        .catch((err) => {
          if (err) {
            throw err;
          }
        });
    } else {
      res.status(200).send(result);
    }
  });
};

const deleteAll = () => {
  Fixture.deleteMany()
    .then()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  create,
  read,
  deleteAll,
};
