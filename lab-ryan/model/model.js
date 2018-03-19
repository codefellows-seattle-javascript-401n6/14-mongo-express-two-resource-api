'use strict';

const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    name: String,
    date: Number,
});

let chuckNorrisSchema = mongoose.Schema({
    name: String,
    movie: [movieSchema],
});

let Norris = mongoose.model('Norris', chuckNorrisSchema);
let Movies = mongoose.model('Movies', movieSchema);


module.exports = {Norris, Movies};