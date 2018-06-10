'use strict';

const mongoose = require('mongoose');


const Beer = require('../models/beer');
const Recipe = require('../models/recipe');

const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost/brewery';

mongoose.connect(DATABASE_URL).then(
  () => {
    console.info(`Mongoose connection successfully created.`);
  })
  .catch((error) => {
    console.error(`Error on connection: ${error}`);
  });

function getAll() {
  return new Promise((resolve, reject) => {
    Beer.find((err, beers) => {
      resolve(beers);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Beer.findOne({ _id: id })
      .populate('recipe')
      .then(beerinfo => {
        resolve(beerinfo);
      });
  });
}

function save(beer) {
  let beerModel = new Beer({
    name: beer.name,
    style: beer.style,
    abv: beer.abv,
    recipeId: beer.recipeId
  });
  return new Promise((resolve, reject) => {
    beerModel.save((err, savedBeer) => {
      if (err) {
        console.error(err);
      }
      resolve(savedBeer);
    });
  });
}


function update(id, beer) {
  return new Promise((resolve, reject) => {
    Beer.findOneAndUpdate(id, beer, (err, beer) => {
      if (err) {
        console.error(err);
      }
      resolve(beer);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Beer.remove({ _id: id }, (err, beer) => {
      if (err) {
        console.error(err);
      }
      resolve(beer);
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