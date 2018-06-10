'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');

const Beer = require('../models/beer');
const Recipe = require('../models/recipe');

// refactor this to be a sub document instead of nesting it inside like this

let rainRecipe = new Recipe({
  hops: 'Mount Rainier'
});

let rainer = new Beer({
  name: 'Rainer',
  style: 'American Lager',
  abv: 4.6,
  recipeId: rainRecipe
});

Promise.all([Beer.remove(), Recipe.remove()])
  .then(() => {
    return Promise.all([rainRecipe.save(), rainer.save()]);
  })
  .then(docs => {
    let recipe = docs[0];
    let beer = docs[1];
    console.log('rain', rainRecipe);
    console.log('rainer', rainer);

    // findOne if looking for one find if looking for all

    return Beer.find({ name: 'Rainer' });
    // mongoose.disconnect();
  })
  .then(beer => {
    console.log(beer[0]._id, 'beer');

    return Beer.findById(beer[0]._id).then(beer => {
      console.log('recipe:', beer.recipeId);
    });
  })
  .then(() => {
    return Beer.find({ name: 'Ranier' }).populate('recipeId');
  })
  .then(beer => {
    console.log('Found w/  populate:', beer);
  })
  .catch(err => {
    console.log('Error creating recipe and beer:', err.message);
    mongoose.disconnect();
  });
