'use strict';

const mongoose = require('mongoose');
const Beer = require('./beer');

let ALLHOPS = ['Cascade', 'Northern Brewer', 'Mount Hood', 'Summit', 'Amarillo', 'Simcoe', 'Centennial', 'Citra', 'Fuggle', 'Mount Rainier']

let ALLMALTS = ['2 row', 'munich', 'Victory', 'Black Malt', 'Caramel Malt', 'Roasted Barley', 'Wheat, Flaked', 'Chocolate Malt', 'Golden Light LME', 'Pilsen Malt']

const MaltSchema = mongoose.Schema({
    fermentables: {type:String, enum: ALLMALTS},
    ammount: Number
})

const HopsSchema = mongoose.Schema({
    hops: {type:String, enum: ALLHOPS},
    ammount: Number
})

const RecipeSchema = mongoose.Schema({
    fermentables:{
        type: [MaltSchema]
    },
    hops: {
        type: [HopsSchema]
    },
    yeast: String,
});
RecipeSchema.methods.getBeers = function() {
    return Beer.find({recipeId: this._id});
  };

let Recipe = mongoose.model('beer ingredients', RecipeSchema);
let Hops = mongoose.model('hops and ammount of them', HopsSchema);
let Malt = mongoose.model('malts and ammount of them', MaltSchema);



module.exports = Recipe;