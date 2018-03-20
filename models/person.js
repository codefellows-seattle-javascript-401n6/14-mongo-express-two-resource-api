const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/carsandowners');

const personSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  cars: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Car'
    }
  ]
});

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
