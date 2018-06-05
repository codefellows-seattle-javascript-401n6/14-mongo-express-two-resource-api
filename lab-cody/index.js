'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/brewery');

const app = express();

const beerRoute = require('./routes/beer-route');
const recipeRoute = require('./routes/recipe-route');

app.use(bodyParser.json());

app.use('/api/beers', beerRoute);
app.use('/api/recipe', recipeRoute);

let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
