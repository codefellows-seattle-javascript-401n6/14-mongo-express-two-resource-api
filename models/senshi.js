'use strict'
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sailorSenshiTwo');

let senshiSchema = mongoose.Schema({
    senshiTitle: mongoose.Schema.Types.ObjectId, 
    name:String, 
    power: String, 
    rank:String,
});
const Senshi = mongoose.model('senshi', senshiSchema);

module.exports = Senshi;