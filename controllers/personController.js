'use strict';

const Person = require('../models/person');
const createError = require('http-errors');

let list = (req, res) => {
  Person.find()
    .populate('cars', 'model')
    .exec()
    .then(list => res.json(list))
    .catch(err => createError(500, err));
};

let getPerson = (req, res) => {
  Person.findById(req.params._id)
    .populate('cars')
    .exec()
    .then(person => {
      res.json(person);
    })

    .catch(err => createError(404, err));
};

let create = (req, res) => {
  new Person(req.body)
    .save()
    .then(person => res.json(person))
    .catch(err => createError(400, err));
};

let update = (req, res) => {
  Person.findByIdAndUpdate(req.body.id, req.body, { new: true })
    .then(person =>
      res.sendStatus(204).json({ message: 'Successfully updated owner' })
    )
    .catch(err => createError(400, err));
};

let remove = (req, res) => {
  Person.findByIdAndRemove(req.params._id).then(person =>
    res.send('Successfully deleted owner:' + req.params._id)
  );
};

let removeAll = (req, res) => {
  Person.remove({})
    .then(owners => res.send('Successfully reoved all owners'))
    .catch(err => {
      console.log(err);
      res.send(err.message);
    });
};

module.exports = { list, getPerson, create, update, remove, removeAll };
