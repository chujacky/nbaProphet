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
const teams = require('./db/controllers/teams');
const Team = require('./db/model/teams');

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

Team.find({}, (err, results) => {
  if (err) {
    console.log(err);
  }
  if (!results.length) {
    axios.get('https://www.thesportsdb.com/api/v1/json/1/search_all_teams.php?l=NBA')
      .then((response) => {
        const teamsInfo = response.data.teams.map((team) => {
          const info = {
            name: team.strTeam,
            triCode: team.strTeamShort,
            logo: team.strTeamBadge,
          };
          return info;
        });
        teams.create(teamsInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

app.get('/getfixtures', (req, res) => {
  fixtures.read(req, res);
});

app.get('/getstandings', (req, res) => {
  rankings.read(req, res);
});

app.get('/getteams', (req, res) => {
  teams.read(req, res);
});

app.get('/getresults', (req, res) => {
  results.read(req, res);
});

app.post('/predictions', (req, res) => {
  // console.log(req.body);
  predictions.create(req, res);
});

app.listen(process.env.PORT || port, () => console.log(`score prophet listening on port ${port}`))