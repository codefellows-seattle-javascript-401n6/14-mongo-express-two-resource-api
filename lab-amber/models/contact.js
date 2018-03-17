'use strict';

const mongoose = require('mongoose');
const Lead = require('./lead.js');

let contactSchema = mongoose.Schema({
  name: {type: String, required: true},
  company: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validator: function(v){
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
    }
  }
});

// contactSchema.methods.getLeads = function() {
//   return Lead.find({contactId: this._id});
// }

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;