'use strict';

const mongoose = require('mongoose');

const Car = requre('../models/cars.js');

mongoose.connect('mongodb://localhost/cartest')
.then (() => {
    console.info('mongoose is running');
}).catch (
    (error => {
        console.error(`Mongoose connection error ${error}`);
    })
)

function save(car) {
    let carModel = new Car({
        make: car.make,
        model: car.model,
        year: car.year,
    })
    return new Promise((resolve, reject)=> {
        carModel.save((err, saveCar) => {
            resolve(savedCar);
        })
    });
}

function getAll() {
    return new Promise((resolve, reject) => {
        Car.find((err, carCollection) => {
            resolve(carCollection);
        })
    });
}

function update(id, car) {
    return new Promise((resolve, reject) => {
        Car.findOneAndUpdate(id, car, (err, car) => {
            resolve(car);
        });
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        car.remove({_id: id}, (err, car) => {
            resolve(car)
        })
    });
}

module.exports = {save, get, getAll, remove, update};