const Promise = require('bluebird');
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
      .then((results) => {
        Prediction.find({}, (err, predictions) => {
          if (err) {
            console.log(err);
          }
          const prediction = {};
          predictions.forEach((predict) => {
            if (!prediction[predict.game_id]) {
              prediction[predict.game_id] = [predict];
            } else {
              prediction[predict.game_id].push(predict);
            }
          });
          for (let i = 0; i < results.length; i += 1) {
            if (prediction[results[i].game_id]) {
              prediction[results[i].game_id].forEach((predict) => {
                if (results[i].winner === predict.winner) {
                  const { user } = predict;
                  usersInfo[userIndex[user]].points += 10;
                  usersInfo[userIndex[user]].accuracy += 1;
                }
                if (Math.abs(results[i].hScore - predict.hScore) <= 5 || Math.abs(results[i].vScore - predict.vScore) <= 5) {
                  const { user } = predict;
                  usersInfo[userIndex[user]].points += 5;
                }
              });
            }
          }
          console.log(usersInfo);
          Ranking.insertMany(usersInfo, (err) =>{
            if (err) {
              console.log(err);
            }
            cb();
          });
        });
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
