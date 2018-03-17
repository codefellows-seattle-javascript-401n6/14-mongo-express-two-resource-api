'use strict';

const mongoose = require('mongoose');

let quoteSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  expiration: {
    type: Date,
    default: new Date(+ new Date() + 7 * 24 * 60 * 60 * 1000),
  },
  cost: {type: Number, required: true},
});

let jobSchema = mongoose.Schema({
  name: {type: String, required: true},
  quote: quoteSchema
});

jobSchema.methods.isExpired = function() {
  let today = new Date();
  let expiration = this.quote.expiration;
  if (today.getTime() <= expiration.getTime()) {
    return false;
  } else {
    return true;
  }
};

const Quote = mongoose.model('Quote', quoteSchema);
const Job = mongoose.model('Job', jobSchema);

module.exports = {
  Quote,
  Job
};