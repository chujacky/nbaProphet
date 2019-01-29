const Ranking = require('../model/rankings');
const Prediction = require('../model/predictions');
const Result = require('../model/results');

const createUsersInfo = (results, cb) => {
  Prediction.find({}).distinct('user', (err, users) => {
    if (err) {
      console.log(err);
    }
    const userIndex = {};
    const usersInfo = users.map((user, index) => {
      const userInfo = {
        user,
        points: 0,
        accuracy: 0,
      };
      userIndex[user] = index;
      return userInfo;
    });
    cb(usersInfo, userIndex);
  });
}

const create = (gameResults) => {  
  createUsersInfo(gameResults, (usersInfo, userIndex) => {
    Result.find({}).sort({ game_id: 1 })
      .then(async (results) => {
        for (let i = 0; i < results.length; i += 1) {
          await Prediction.find({game_id: results[i].game_id})
            .then((predictions) => {
              predictions.forEach((prediction) => {
                if (results[i].winner === prediction.winner) {
                  const { user } = prediction;
                  usersInfo[userIndex[user]].points += 10;
                  usersInfo[userIndex[user]].accuracy += 1;
                }
              })
            })
        }
        console.log(usersInfo);
        return Ranking.insertMany(usersInfo);
      })
      .then((rankings) => {
        console.log(rankings);
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });
};

module.exports = {
  create,
};


// Prediction.find({ user }, (err, predictions) => {
//   if (err) {
//     console.log(err);
//   }
//   predictions.forEach((prediction) => {
//     const { game_id, winner } = prediction;
//     console.log(winner);
//     Result.find({game_id}, (err, guess) => {
//       if (err) {
//         console.log(err);
//       }
//       if (winner === guess[0].winner) {
//         console.log(`${guess[0].winner} correct`, user);
//         userInfo.points += 10;
//         userInfo.accuracy += 1;
//       }
//     });
//   });
// });