const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const schedule = require('node-schedule');
const db = require('./db/db');
const predictions = require('./db/controllers/predictions');
const fixtures = require('./db/controllers/fixtures');
const moment = require('moment');

const rule = new schedule.RecurrenceRule();
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
      console.log(response.data.games);
      // fixtures.create(response.data.games);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.get('/get', (req, res) => {
  // axios.get('http://data.nba.net/prod/v1/20190127/scoreboard.json')
  //   .then((response) => {
  //     // console.log(response.data.games);
  //     res.status(200).send(response.data.games);
  //   })
  //   .catch((err) => {
  //     if (err) {
  //       throw err;
  //     }
  //   });
  fixtures.read(req, res);
});

app.post('/predictions', (req, res) => {
  console.log(req.body);
  predictions.create(req, res);
});

app.listen(port, () => console.log(`score prophet listening on port ${port}`))