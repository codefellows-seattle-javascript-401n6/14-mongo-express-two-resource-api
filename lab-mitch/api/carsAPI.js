'use strict' ;

const express = require('express');
const router = express.Router();

const storage = require('../storage/car-mongo-storage.js');
const Cars = require('../models/cars.js');

router.get('/', (req, res) => {
    if(req.query.id) {
        let id = req.query.id;
        storage.get(id)
        .then(Cars => {
            res.send(Cars);
        });
    } else {
        storage.getAll()
        .then(Cars => {
            res.send(Cars);
        });
    }
});

router.post('/', (req, res) => {
    let Cars = {
        make: req.body.name,
        color: req.body.color,
        year: req.body.year,
    }
    storage.save(Cars)
    .then(Cars =>{
        res.status(200);
        res.send(Cars)
    });
});

router.put('/', (req, res) => {
    let id = req.query.id;
    let carCollection = req.body;
    console.log('Current car collection ', carCollection);

    carCollection.update(id, carCollection);
    .then(carCollection = {
        console.log('New car collection ', carCollection);
        res.send(carCollection);
    });
});

module.exports = router;