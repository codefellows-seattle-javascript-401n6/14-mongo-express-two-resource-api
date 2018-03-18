const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cars');

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  }
});

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
