const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const moment = require('moment');
const schedule = require('node-schedule');
const db = require('./db/db');
const predictions = require('./db/controllers/predictions');
const fixtures = require('./db/controllers/fixtures');
const results = require('./db/controllers/results');
const rankings = require('./db/controllers/rankings');

const rule = new schedule.RecurrenceRule();
const truncate = new schedule.RecurrenceRule();
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(cors());

truncate.hour = 23;
truncate.minute = 55;

schedule.scheduleJob(truncate, () => {
  console.log('hi')
  fixtures.deleteAll();
  results.deleteAll();
  rankings.deleteAll();
});

rule.hour = 0;
rule.minute = 0;
schedule.scheduleJob(rule, () => {
  const gameDay = moment().format('YYYYMMDD');
  axios.get(`http://data.nba.net/prod/v1/${gameDay}/scoreboard.json`)
    .then((response) => {
      // console.log(response.data.games);
      fixtures.create(response.data.games, () => {});
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
  const resultDay = moment().subtract(1, 'days').format('YYYYMMDD');
  axios.get(`http://data.nba.net/prod/v1/${resultDay}/scoreboard.json`)
    .then((response) => {
      // console.log(response.data.games);
      results.create(response.data.games, () => {
        rankings.create();
      });
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get('/getfixtures', (req, res) => {
  fixtures.read(req, res);
});

app.get('/getstandings', (req, res) => {
  rankings.read(req, res);
});

app.post('/predictions', (req, res) => {
  // console.log(req.body);
  predictions.create(req, res);
});

app.listen(port, () => console.log(`score prophet listening on port ${port}`))