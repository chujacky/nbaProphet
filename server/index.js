const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const db = require('./db/db');

const port = 3000;

const app = express();


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());
app.use(cors());

app.get('/get', (req, res) => {
  axios.get('http://data.nba.net/prod/v1/20190127/scoreboard.json')
    .then((response) => {
      // console.log(response.data.games);
      res.status(200).send(response.data.games);
    })
    .catch((err) => {
      if (err) {
        throw err;
      }
    });
});

app.post('/predictions', (req, res) => {
  console.log(req.body);
})

app.listen(port, () => console.log(`score prophet listening on port ${port}`))