'use strict';

const mongoose = require('mongoose');

const composerSchema = new mongoose.Schema({
  name: String,
  song: {
    type: mongoose.Schema.Types.objectId,
    ref: 'Song'
  }
});

const Composer = mongoose.model('Composer', composerSchema);

module.exports = Composer;