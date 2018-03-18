'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cars');

const carSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  brandId: mongoose.Schema.Types.ObjectId
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;

