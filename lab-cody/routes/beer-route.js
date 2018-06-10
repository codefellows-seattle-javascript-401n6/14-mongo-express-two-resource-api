'use strict';

const express = require('express');
const mongoose = require('mongoose');

const Beer = require('../models/beer');
const Recipe = require('../models/recipe').Recipe;
const beerStorage = require('../lib/beer');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query.id) {
    let id = req.query.id;
    beerStorage
      .get(id)
      .then(beer => {
        res.send(beer);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    beerStorage
      .getAll()
      .then(beers => {
        res.send(beers);
      })
      .catch(err => {
        console.error(err);
      });
  }
});

router.post('/', (req, res) => {
  console.log(req.body, 'req.body is ?'); //at this point req.body has all the info it is supposed to.
  beerStorage
    .save(req.body)
    .then(brews => {
      console.log(brews, 'what is brews?');
      //   console.log(recipe, 'what is recipe?');
      req.body.recipes.forEach(recipe => {
        console.log(recipes, 'what is recipe here?');

        recipe = new Recipe({
          hops: recipe.hops
        });
        recipe.save();
        brews.recipes.push(recipe);
      });
      return brews.save();
    })
    .then(brews => {
      res.status(200);
      res.send(brews);
    })
    .catch(err => {
      console.error(err);
    });
});

router.put('/', (req, res) => {
  beerStorage
    .update(req.query.id, req.body)
    .then(beer => {
      res.status(200);
      res.send('updated successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

router.delete('/', (req, res) => {
  beerStorage
    .remove(req.query.id)
    .then(beer => {
      res.status(204);
      res.send('deleted successfully');
    })
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;
