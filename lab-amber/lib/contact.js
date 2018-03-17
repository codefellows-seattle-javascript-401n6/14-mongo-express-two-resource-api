'use strict';

const mongoose = require('mongoose');

const Contact = require('../models/contact.js');

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
    Contact.findOne({_id: id}, (err, contact) => {
      resolve(contact);
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
    contactModel.save((err, savedcontact) => {
      if (err) {
        console.error(err);
      }
      console.log('saved contact', savedContact);
      resolve(savedContact);
    });
  });
}


// function update(id, lead) {
//   return new Promise((resolve, reject) => {
//     Info.Lead.findOneAndUpdate(id, lead, (err, lead) => {
//       if (err) {
//         console.error(err);
//       }
//       resolve(lead);
//     });
//   });
// }

// function remove(id) {
//   return new Promise((resolve, reject) => {
//     Info.Lead.remove({_id: id}, (err, lead) => {
//       if (err) {
//         console.error(err);
//       }
//       resolve(lead);
//     });
//   });
// }


module.exports = {
  save,
  getAll,
  get,
  // update,
  // remove,
}