const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

const app = express();


app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.listen(port, () => console.log(`score prophet listening on port ${port}`))