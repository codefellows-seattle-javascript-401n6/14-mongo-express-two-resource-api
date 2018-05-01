'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const Senshi = require('../models/senshi.js');
//next will be for error middlewear eventually.
const senshiInfoRouter = module.exports = new Router();
//when we make a post request for info it will go into a senshi
console.log('9 inforouter');
senshiInfoRouter.get('/api/senshi/info', (req, res, next) =>{
  Senshi.find({})
    .then(senshi => res.json(senshi))
    .catch(next);
});

senshiInfoRouter.post('/api/senshi/:senshiId/info', jsonParser, (req, res, next) =>{
  //adds info to the senshi
  console.log('14 req.body', req.body);
  Senshi.findByIdAndAddinfo(req.params.senshiId, req.body)
  .then(senshiInfo => res.json(senshiInfo))
  .catch(next);
});


