'use strict';

const mongoose = require('mongoose');
const Info = require('./job.js');
const Job = Info.Job;

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
  },
  jobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job'
  }]
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;