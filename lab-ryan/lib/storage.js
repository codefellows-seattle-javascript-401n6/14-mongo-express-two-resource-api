'use strict';

const mongoose = require('mongoose');

const Actor = require('../model/model.js');
//Actor is using Norris and Movies from model.js file


const DATABASE_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

mongoose.connect(DATABASE_URL)
.then(() => {
    console.info('mongoose is connected');
}).catch (
    (error => {
        console.error(`oops, something went wrong, ${error}`);
    })
)

function save(norris){
    let movieModel = new Actor.Movies({
        name: norris.movie[0].name,
        date: norris.movie[0].date,
    });
    let norrisModel = new Actor.Norris({
        name: norris.name,
        movie: movieModel,
    });
    return new Promise((resolve, reject) => {
        norrisModel.save((err, actionHero) => {
            resolve(actionHero);
        })
    });
}

function getAll(){
    return new Promise((resolve, reject) => {
        Actor.Norris.find((err, norris) => {
            resolve(norris);
        });
    });
}

function get(id){
    return new Promise((resolve, reject) => {
        Actor.Norris.findOne({_id: id}, (err, norris) => {
            resolve(norris);
        });
    });
}

function update(id, norris) {
    return new Promise((resolve, reject) => {
        Actor.Norris.findOneAndUpdate(id, norris, (err, norris) => {
           resolve(norris);
        });
    });
}

function remove(id){
    return new Promise((resolve, reject) => {
        Actor.Norris.remove({_id: id}, (err, norris) => {
            resolve(norris);
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