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
const rule1 = new schedule.RecurrenceRule();
const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(cors());


rule.hour = 0;
rule.minute = 0;
schedule.scheduleJob(rule, () => {
  const day = moment().format('YYYYMMDD');
  axios.get(`http://data.nba.net/prod/v1/${day}/scoreboard.json`)
    .then((response) => {
      // console.log(response.data.games);
      fixtures.create(response.data.games);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});


rule1.hour = 16;
rule1.minute = 7;
schedule.scheduleJob(rule1, () => {
  axios.get(`http://data.nba.net/prod/v1/20190127/scoreboard.json`)
    .then((response) => {
      // console.log(response.data.games);
      results.create(response.data.games, rankings.create);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get('/get', (req, res) => {
  fixtures.read(req, res);
});

app.post('/predictions', (req, res) => {
  // console.log(req.body);
  predictions.create(req, res);
});

app.listen(port, () => console.log(`score prophet listening on port ${port}`))