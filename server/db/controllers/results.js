const Result = require('../model/results');

const create = (gameResults, cb) => {
  // console.log('hi');
  const results = gameResults.map((result) => {
    const gameInfo = {
      game_id: Number(result.gameId),
      hTeam: result.hTeam.triCode,
      hScore: Number(result.hTeam.score),
      vTeam: result.vTeam.triCode,
      vScore: Number(result.vTeam.score),
      winner: Number(result.hTeam.score) > Number(result.vTeam.score) ? result.hTeam.triCode : result.vTeam.triCode,
    };
    return gameInfo;
  });
  // console.log(results);
  Result.insertMany(results, (err, response) => {
    if (err) {
      console.log(err);
    }
    cb(response);
  });
};

const read = (req, res) => {
  Result.find({}, (err, results) => {
    if (err) {
      console.log(err);
    }
    res.status(200).send(results);
  });
};

const deleteAll = () => {
  Result.deleteMany()
    .then()
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  create,
  deleteAll,
  read,
};
