'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let senshiInfoSchema = Schema({
  title: { type: String, required: true},
  color :{ type: String, required: true},
  senshiID: { type: Schema.Types.ObjectId, required: true}  
});

module.exports = mongoose.model('senshiInfo', senshiInfoSchema);
