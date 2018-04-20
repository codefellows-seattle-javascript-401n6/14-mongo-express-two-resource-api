'use strict';
const mongoose = require('mongoose');
const createError = require('http-errors');
const Title = require('./senshiTitle.js');

let senshiSchema = mongoose.Schema({
  name:{ type: String, require: true},
  age:{ type: String, require: true}, 
  senshiTitle: [{type: Schema.Types.ObjectId, ref: 'title'}]
});
const Senshi = mongoose.model('senshi', senshiSchema);

module.exports = Senshi;

Senshi.findByIdAddTitle = function(id, title){
  return Senshi.findById(id)
  .then(senshi => {
    title.senshiId = senshi._id;
    this.tempSenshi = senshi;
    return new Senshi(senshi).save();
  })
  .then( title =>{
    this.tempSenshi.senshiTitle.push(senshi._id);
    this.tempTitle = title;
    return this.tempSenshi.save();
  })
  .then(() => {
    return this.tempSenshi;
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};