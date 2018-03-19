'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');

const Beer = require('../models/beer');
const Recipe = require('../models/recipe').Recipe;
const Malts = require('../models/recipe').Malt;
const Hops = require('../models/recipe').Hops;

// artist

// refactor this to be a sub document instead of nesting it inside like this
// let rainRecipe = new Recipe({
//   fermentables: { type: 'Pilsen Malt', ammount: 12 },
//   hops: { type: 'Mount Rainier', ammount: 5 },
//   yeast: 'White Labs WLP940'
// });
// song
let rainer = new Beer({
  name: 'Rainer',
  style: 'American Lager',
  abv: 4.6,
  ingredients: Recipe
});

Promise.all([
  // Beer.remove(),
  // Recipe.remove()
])
  .then(() => {
    return Promise.all([
      // rainRecipe.save(),
      rainer.save()
    ]);
  })
  .then(docs => {
    let beer = docs[0];
    // let recipe = docs[1];
    // console.log('rain', rainRecipe);
    // console.log('rainer', rainer);

    // findOne if looking for one find if looking for all

    return Beer.find({ name: 'Rainer' });
    // mongoose.disconnect();
  })
  .then(beer => {
    // console.log(beer[0]._id, 'beer');
    // grab the artist id stored on the song
    // console.log('ID:', beer[0]._id);

    return Beer.findById(beer[0]._id)
      .then(beer => {
        console.log(beer, 'what is beer?');
        // console.log(beer, 'this is recipe');
        // console.log('name:', beer.name);
        // console.log('style:', beer.style);
        // console.log('abv:', beer.abv);
        console.log('recipe:', beer.ingredients);
      });
  })
  // .then(() => {
  //   return Beer.find({name: 'Ranier'})
  //   .populate('recipe');
  // })
  // .then(beer => {
  //   console.log('Found w/  populate:', beer);
  // })
  .catch(err => {
    console.log('Error creating artist and song:', err.message);
    mongoose.disconnect();
  });

