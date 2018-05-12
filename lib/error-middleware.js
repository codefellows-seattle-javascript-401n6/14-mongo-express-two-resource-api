'use strict';

const createError = require('http-errors');

module.exports = function(err, req, res, next){
  console.error('msg:', err.message);
  console.error('name', err.name);

  if(err.status){
    res.status(err.status).send(err.name);
    next();
    return;
  }
    //we get ValidationError if we give mongodb
    //a value that doesn't match the prperties assigned value
    
  if(err.name === 'ValidationError') {
    err = createError(401, err.message);
    res.status(err.status).send(err.name);
    next();
    return;
  }
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
  return;
}