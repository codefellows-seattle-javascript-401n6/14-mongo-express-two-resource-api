'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const senshiInfoSchema = Schema({
  title: { type: String, required: true},
  constent :{ type: String, required: true},
  senshiID: { type: Schema.Types.ObjectId, required: true}  
});

module.exports = mongoose.model('senshiInfo', senshiInfoSchema);
