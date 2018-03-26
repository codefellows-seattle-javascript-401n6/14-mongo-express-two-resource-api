'use strict';

const mongoose = require('mongoose');
const mongone = require('./mongone.js');

const Contact = require('../models/contact.js');
const Info = require('../models/job.js');

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
    Contact.find((err, contacts) => {
      resolve(contacts);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Contact.findOne({ _id: id })
      .populate('jobs')
      .then(detailed => {
        resolve(detailed);
      });
  });
}

function save(contact) {
  let contactModel = new Contact({
    name: contact.name,
    company: contact.company,
    email: contact.email
  });
  return new Promise((resolve, reject) => {
    contactModel.save((err, savedContact) => {
      if (err) {
        console.error(err);
      }
      resolve(savedContact);
    });
  });
}


function update(id, contact) {
  return new Promise((resolve, reject) => {
    Contact.findOneAndUpdate(id, contact, (err, contact) => {
      if (err) {
        console.error(err);
      }
      resolve(contact);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Contact.remove({ _id: id }, (err, contact) => {
      if (err) {
        console.error(err);
      }
      resolve(contact);
    });
  });
}

function seed() {
  let save() {
    
  }
}

module.exports = {
  save,
  getAll,
  get,
  update,
  remove,
};