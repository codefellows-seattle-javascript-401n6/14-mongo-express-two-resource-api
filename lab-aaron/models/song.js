'use strict';

const mongoose = require('mongoose');

const songSchema = new mongoose.Schema ({
  title: String,
  difficulty: Number
});

let Song = mongoose.model('Song', songSchema);

module.exports = Song;