'use strict';

const Norris = require('../model/model.js');
const Movies = require('../model/model.js');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/norris');


let deltaForce = new Movie({name: 'Delta Force', date: 1986});
let loneWolf = new Movie({name: 'Lone Wolf McQuade', date: 1983});
let octagon = new Movie ({name: 'The Octagon', date: 1980});

let movies = [deltaForce, loneWolf, octagon];

let norris = new Norris();
console.log(octagon, 'Welcome to the Octagon');

norris.save()
.then(norris => {
    console.log('Norris:', norris);
    mongoose.disconnect();
})

module.exports = norris;


