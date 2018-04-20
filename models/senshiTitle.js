'use strict';
const mongoose = require('mongoose');
let senshiTitleSchema = mongoose.Schema({
  senshiTitle:{ type: String, require: true},   
  color:{ type: String, require: true},
  senshiId:{type: Schema.Types.ObjectId, require: true}  
});
const Senshi = mongoose.model('senshiTitleSchema', senshiTitleSchema);

module.exports = Senshi;