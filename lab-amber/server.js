'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/lead.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Listening in at http://localhost:${PORT}.`);
});