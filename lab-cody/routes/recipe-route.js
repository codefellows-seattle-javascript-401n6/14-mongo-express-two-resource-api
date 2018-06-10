'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Ingredients = require('../models/recipe'); 
const storage = require('../lib/recipe'); 

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    storage.get(id)
      .then(recipe => {
        res.send(recipe);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    storage.getAll()
      .then(recipes => {
        res.send(recipes);
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
    .then(recipe => {
      res.status(200);
      res.send(recipe);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/', (req, res) => {
  storage.update(req.query.id, req.body)
    .then(recipe => {
      res.status(200);
      res.send('updated successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete('/', (req, res) => {
  storage.remove(req.query.id)
    .then(recipe => {
      res.status(204);
      res.send('deleted successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;