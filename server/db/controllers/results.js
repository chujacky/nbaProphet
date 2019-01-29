const Result = require('../model/results');

const create = (gameResults, cb) => {
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

module.exports = {
  create,
};
