'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Info = require('../models/job.js');
const storage = require('../lib/job.js');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    storage.get(id)
      .then(job => {
        let expired = job.isExpired();
        let reply = {
          job,
          expired,
        };
        res.send(reply);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    storage.getAll()
      .then(jobs => {
        res.send(jobs);
      })
      .then(() => {
      })
      .catch(err => {
        console.error(err);
      });
  }
});

router.post('/', (req, res) => {
  storage.save(req.body)
    .then(job => {
      res.status(200);
      res.send(job);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/', (req, res) => {
  storage.update(req.query.id, req.body)
    .then(job => {
      res.status(200);
      res.send('updated successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete('/', (req, res) => {
  storage.remove(req.query.id)
    .then(job => {
      res.status(204);
      res.send('deleted successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;