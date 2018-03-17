'use strict';

const mongoose = require('mongoose');

const Info = require('../models/lead.js');

const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(DATABASE_URL).then(
  () => {
    console.info(`Mongoose connection successfully created.`);
  })
  .catch((error) => {
    console.error(`Error on connection: ${error}`);
  });

function getAll() {
  return new Promise((resolve, reject) => {
    Info.Lead.find((err, leads) => {
      resolve(leads);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Info.Lead.findOne({_id: id}, (err, lead) => {
      resolve(lead);
    });
  });
}

function save(lead) {
  let quoteModel = new Info.Quote({
    cost: lead.quote.cost
  });
  let leadModel = new Info.Lead({
    name: lead.name,
    company: lead.company,
    email: lead.email,
    quote: quoteModel,
  });
  return new Promise((resolve, reject) => {
    leadModel.save((err, savedLead) => {
      if (err) {
        console.error(err);
      }
      resolve(savedLead);
    });
  });
}

function update(id, lead) {
  return new Promise((resolve, reject) => {
    Info.Lead.findOneAndUpdate(id, lead, (err, lead) => {
      if (err) {
        console.error(err);
      }
      resolve(lead);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Info.Lead.remove({_id: id}, (err, lead) => {
      if (err) {
        console.error(err);
      }
      resolve(lead);
    });
  });
}


module.exports = {
  save,
  getAll,
  get,
  update,
  remove,
}