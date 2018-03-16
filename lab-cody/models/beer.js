'use strict';

const mongoose = require('mongoose');

const BeerSchema = mongoose.Schema({
    name: String,
    style: String,
    abv: Number,
    recipeId: mongoose.Schema.Types.ObjectId,
});

let Beer = mongoose.model('Beers', BeerSchema);

module.exports = Beer;