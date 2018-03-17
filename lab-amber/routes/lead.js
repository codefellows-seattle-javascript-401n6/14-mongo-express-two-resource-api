'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Lead = require('../models/lead.js');
const storage = require('../lib/lead.js');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    storage.get(id)
    .then(lead => {
      let expired = lead.isExpired();
      let reply = {
        lead,
        expired,
      }
      res.send(reply);
    })
    .catch(err => {
      console.error(err);
    });
  } else {
    storage.getAll()
    .then(leads => {
      res.send(leads);
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
  .then(lead => {
    res.status(200);
    res.send(lead);
  })
  .catch(err => {
    console.error(err);
  });
});

router.put('/', (req, res) => {
  storage.update(req.query.id, req.body)
  .then(lead => {
    res.status(200);
    res.send('updated successfully');
  })
  .catch(err => {
    console.error(err);
  });
});

router.delete('/', (req, res) => {
  storage.remove(req.query.id)
  .then(project => {
    res.status(204);
    res.send('deleted successfully');
  })
  .catch(err => {
    console.error(err);
  });
});

module.exports = router;