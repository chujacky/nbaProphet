const axios = require('axios');
const moment = require('moment');
const Ranking = require('../model/rankings');
const Prediction = require('../model/predictions');
const Result = require('../model/results');
const results = require('../controllers/results');

const createUsersInfo = (cb) => {
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
};

const create = (cb) => {  
  createUsersInfo((usersInfo, userIndex) => {
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
                  if (Math.abs(results[i].hScore - prediction.hScore) <= 5 || Math.abs(results[i].vScore - prediction.vScore) <= 5) {
                    const { user } = prediction;
                    usersInfo[userIndex[user]].points += 5;
                  }
                })
              })
            }
        console.log(usersInfo);
        return Ranking.insertMany(usersInfo);
      })
      .then((rankings) => {
        console.log(rankings);
        cb();
      })
      .catch((err) => {
        if (err) {
          console.log(err);
        }
      });
  });
};

const read = (req, res) => {
  Ranking.find({}).sort({ points: -1 }).sort({ accuracy: -1 })
    .then((rankings) => {
      if (!rankings.length) {
        const day = moment().subtract(1, 'days').format('YYYYMMDD');
        axios.get(`http://data.nba.net/prod/v1/${day}/scoreboard.json`)
          .then((response) => {
            // console.log(response.data.games);
            results.create(response.data.games, () => {
              create(() => {
                read(req, res);
              });
            });
          })
          .catch((err) => {
            if (err) {
              throw err;
            }
          });
      } else {
        res.status(200).send(rankings);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteAll = () => {
  Ranking.deleteMany()
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