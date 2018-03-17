'use strict';

const mongoose = require('mongoose');

let quoteSchema = mongoose.Schema({
  date: {type: Date, default: Date.now},
  expiration: {
    type: Date,
    default: new Date(+ new Date() + 7*24*60*60*1000),
  },
  cost: {type: Number, required: true},
});

let leadSchema = mongoose.Schema({
  contactId: mongoose.Schema.Types.ObjectId,
  quote: quoteSchema
});

leadSchema.methods.isExpired = function() {
  let today = new Date();
  let expiration = this.quote.expiration;
  if (today.getTime() <= expiration.getTime()) {
    return false;
  } else {
    return true;
  }
}

const Quote = mongoose.model('quotes', quoteSchema);
const Lead = mongoose.model('leads', leadSchema);

module.exports = {
  Quote,
  Lead
}