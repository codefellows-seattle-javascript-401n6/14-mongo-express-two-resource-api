'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const Senshi = require('../models/senshi.js');
const senshiRouter = module.exports = new Router();

senshiRouter.get('/api/senshi/:senshiId', (req, res, next) =>{
 
  Senshi.findById(req.params.senshiId)
    .populate('senshiInfos')
    .then(senshi => res.json(senshi))
    .catch(next);
});

senshiRouter.get('/api/senshi', (req, res, next) =>{
  Senshi.find({})
    .then(senshi => res.json(senshi))
    .catch(next);
});
//POST a senshi, and when the list is GET at a senshi time
//the senshi will populate with senshiInfo
senshiRouter.post('/api/senshi', jsonParser, function (req, res, next){
  console.log('19 body',req.body);
  new Senshi(req.body).save()
  .then( senshi => res.json(senshi))
  .catch(next);
});



senshiInfoRouter.put('/api/senshi/:senshiId', jsonParser, (req, res, next) =>{
  Senshi.findByIdAndUpdate(req.params.senshiId, req.body, {new: true})
  .then( senshi => res.json(senshi))
  .catch(err =>{
    if(err.name === 'ValidationError') return next(err);
    next(createError(404, err.message));
  });
});



senshiRouter.delete('/api/senshi/:senshiId', (req, res, next) => {
  Senshi.findByIdAndRemove(req.params.senshiId)
  .then( () => res.status(204).send())
  .catch( err => next(createError(404, err.message)));
});
