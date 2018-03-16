const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beers');

const Beer = require('../models/beer');
const Recipe = require('../models/recipe');
const Malts = require('../models/recipe');
const Hops = require('../models/recipe');

// artist

// refactor this to be a sub document instead of nesting it inside like this
let rain = new Recipe({
    fermentables:{type:'Pilsen Malt', ammount: 12},
    hops:{type:'Mount Rainier',ammount: 5},
    yeast:'White Labs WLP940'
})
// song
let rainer = new Beer({
    name: 'Rainer',
    style: 'American Lager',
    abv: 4.6,
    ingredients: rain
});

Promise.all([
    Beer.remove(),
    Recipe.remove()
  ])
  .then(() => {
    return Promise.all([
    rain.save(),
    rainer.save()
    ]);
  })
  .then(docs => {
    let beer = docs[0];
    let recipe = docs[1];
    console.log('rain', rain);
    console.log('rainer', rainer);
  
    return Beer.find({name: 'Rainer'});
    mongoose.disconnect();
  })
  .then(beer => {
    // grab the artist id stored on the song
    console.log('ID:', beer.recipe);
    
    return Recipe.findById(beer.recipe)
    .then(recipe => {
      console.log('  name:', beer.name);
      console.log('style:', beer.style);
      console.log('abv:', beer.abv);
      console.log('recipe:', beer.recipe);
    });
  })
  .then(() => {
    return Beer.find({name: 'Ranier'})
    .populate('recipe');
  })
  .then(beer => {
    console.log('Found w/  populate:', beer);
  })
  .catch(err => {
    console.log('Error creating artist and song:', err.message);
    mongoose.disconnect();
  });

