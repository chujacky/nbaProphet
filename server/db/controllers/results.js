const Result = require('../model/results');

const create = (gameResults, cb) => {
  const results = gameResults.map((result) => {
    const gameInfo = {
      game_id: result.gameId,
      hTeam: result.hTeam.triCode,
      hScore: result.hTeam.score,
      vTeam: result.vTeam.triCode,
      vScore: result.vTeam.score,
      winner: result.hTeam.score > result.vTeam.score ? result.hTeam.triCode : result.vTeam.triCode,
    };
    return gameInfo;
  });
  Result.insertMany(results, (err, response) => {
    if (err) {
      console.log(err);
    }
    cb(response);
  });
};

module.exports = {
  create,
};
