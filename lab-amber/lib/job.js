'use strict';

const mongoose = require('mongoose');
const mongone = require('./mongone.js');

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
    Info.Job.find((err, jobs) => {
      resolve(jobs);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Info.Job.findOne({_id: id}, (err, job) => {
      resolve(job);
    });
  });
}

function save(job) {
  let quoteModel = new Info.Quote({
    cost: job.quote.cost
  });
  let jobModel = new Info.Job({
    name: job.name,
    quote: quoteModel,
  });
  return new Promise((resolve, reject) => {
    jobModel.save((err, savedjob) => {
      if (err) {
        console.error(err);
      }
      resolve(savedjob);
    });
  });
}

function update(id, job) {
  return new Promise((resolve, reject) => {
    Info.Job.findOneAndUpdate(id, job, (err, job) => {
      if (err) {
        console.error(err);
      }
      resolve(job);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Info.Job.remove({_id: id}, (err, job) => {
      if (err) {
        console.error(err);
      }
      resolve(job);
    });
  });
}


module.exports = {
  save,
  getAll,
  get,
  update,
  remove,
};