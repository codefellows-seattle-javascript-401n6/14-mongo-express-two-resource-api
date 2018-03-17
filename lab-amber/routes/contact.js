'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Contact = require('../models/contact.js');
const Job = require('../models/job.js').Job;
const contactStorage = require('../lib/contact.js');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    contactStorage.get(id)
      .then(contact => {
        res.send(contact);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    contactStorage.getAll()
      .then(contacts => {
        res.send(contacts);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

router.post('/', (req, res) => {
  contactStorage.save(req.body)
    .then(lead => {
      req.body.jobs.forEach(job => {
        job = new Job({name: job.name});
        job.save()
        lead.jobs.push(job);
      });
      return lead.save();
    })
    .then(lead => {
      res.status(200);
      res.send(lead);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/', (req, res) => {
  contactStorage.update(req.query.id, req.body)
    .then(contact => {
      res.status(200);
      res.send('updated successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete('/', (req, res) => {
  contactStorage.remove(req.query.id)
    .then(contact => {
      res.status(204);
      res.send('deleted successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;