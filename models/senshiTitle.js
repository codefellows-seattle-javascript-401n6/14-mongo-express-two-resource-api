'use strict'
const mongoose = require('mongoose');
let senshiTitleSchema = mongoose.Schema({
    title:String,
});
const Senshi = mongoose.model('senshiTitle', senshiTitleSchema);

module.exports = Senshi;