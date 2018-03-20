'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Person = require('./person');

mongoose.connect('mongodb://localhost/carsandowners');

const carSchema = new Schema({
  model: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  }
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;
