'use strict';

const Car = require('../models/car');
const Person = require('../models/person');

let list = (req, res) => {
  Car.find()
    .populate('owner', 'name')
    .then(cars => res.json(cars))
    .catch(err => res.send(err.message));
};

let getCar = (req, res) => {
  Car.findById(req.params._id)
    .populate('owner', 'name')
    .then(car => res.json(car))
    .catch(err => res.send(err.message));
};

let create = (req, res) => {
  new Car(req.body)
    .save()
    .then(car => {
      Person.findByIdAndUpdate(
        car.owner,
        { $push: { cars: car._id } },
        (err, person) => {
          if (err) res.send(err.message);
        }
      );
      res.json(car);
    })
    .catch(err => res.send(err.message));
};

let update = (req, res) => {
  Car.findByIdAndUpdate(req.params._id, req.body).then(car =>
    res.send('Successfully update car with id: ' + req.params._id)
  );
};

let remove = (req, res) => {
  Car.findByIdAndRemove(req.params.id)
    .then(car =>
      res
        .sendStatus(204)
        .send('Successfully deleted car with id: ' + req.params._id)
    )
    .catch(err => res.send(err.message));
};

let removeAll = (req, res) => {
  Car.remove({})
    .then(cars => res.send('Successfully reoved all cars'))
    .catch(err => {
      console.log(err);
      res.send(err.message);
    });
};

module.exports = { list, getCar, create, update, remove, removeAll };
