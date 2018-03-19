'use strict';

const express = require('express');
const router = express.Router();

const Cars = require('../models/cars.js');
const storage = require('../storage.mongodb-storage.js');

router.get('/', (req, res) => {
    if (req.query.id) {
        Cars.findOne({
            _id: req.query.id
        })
            .then((results) => {
                res.send(results);
            });
    } else {
        Cars.find()
            .then(results => {
                res.status(400)
                res.send(results);
            })
    }
});


router.post('/', (req, res) => {
    if (req.body.make === undefined || req.body.color === undefined || req.body.year == undefined) {
        res.sendStatus(400);
    } else {
        let car = {
            make: req.body.make,
            color: req.body.date,
            year: req.body.year,
        };
        storage.save(car)
            .then(car => {
                res.status(200);
                res.send(car);
            })
    }
});

router.put('/', (req, res) => {
    let id = req.query.id;
    let car = req.body;
    storage.update(id, car)
    .then(car => {
        res.send(car)
    });
});

router.delete('/', (req, res) => {
    let id = req.query.id;
    storage.remove(id)
    .then(car => {
        res.status(204);
        res.send(car);
    });
});

module.exports = router;