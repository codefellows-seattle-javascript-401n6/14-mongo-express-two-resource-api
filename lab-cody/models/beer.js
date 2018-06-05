'use strict';

const mongoose = require('mongoose');
const Recipe = require('./recipe');

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/brewery');

const BeerSchema = mongoose.Schema({
  name: String,
  style: String,
  abv: Number,
  recipeId: { type: Schema.Types.ObjectId, ref: 'ingredients' }
});

let Beer = mongoose.model('Beers', BeerSchema);

module.exports = Beer;
