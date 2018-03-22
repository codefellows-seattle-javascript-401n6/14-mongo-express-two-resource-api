'use strict';

const mongoose = require('mongoose');


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
    Recipe.find((err, recipes) => {
      resolve(recipes);
    });
  });
}

function get(id) {
  return new Promise((resolve, reject) => {
    Recipe.findOne({_id: id}, (err, recipe) => {
      resolve(recipe);
    });
  });
}

function save(recipe) {

  let recipeModel = new Recipe({
    fermentables: recipe.fermentables,
    hops: recipe.hops,
    yeast: recipe.yeast
  });
  return new Promise((resolve, reject) => {
    recipeModel.save((err, savedRecipe) => {
      if (err) {
        console.error(err);
      }
      resolve(savedRecipe);
    });
  });
}

function update(id, recipe) {
  return new Promise((resolve, reject) => {
    Recipe.findOneAndUpdate(id, recipe, (err, recipe) => {
      if (err) {
        console.error(err);
      }
      resolve(recipe);
    });
  });
}

function remove(id) {
  return new Promise((resolve, reject) => {
    Recipe.remove({_id: id}, (err, recipe) => {
      if (err) {
        console.error(err);
      }
      resolve(recipe);
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