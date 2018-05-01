'use strict';
const mongoose = require('mongoose');
const createError = require('http-errors');
const SenshiInfo = require('./senshiInfo.js');
const Schema = mongoose.Schema;

let senshiSchema = Schema({
  name:{ type: String, require: true},
  age:{ type: String, require: true},
  senshiInfos:[{type: Schema.Types.ObjectId, ref: 'senshiInfo'}]
});
const Senshi = mongoose.model('senshi', senshiSchema);
module.exports = Senshi;

Senshi.findByIdAndAddinfo = function(id, senshiInfo){

  return Senshi.findById(id)
  .then(senshi =>{
    //assigns the senshi id to the senshiInfo
    senshiInfo.senshiID = senshi._id;
    this.tempSenshi = senshi;
    return new SenshiInfo(senshiInfo).save(); 
    //If I return a value from within my then block
    //it will pass the corresponding value into the next block
  })
  .then(senshiInfo => {
    //pushing id into senshiInfo property 
    this.tempSenshi.senshiInfos.push(senshiInfo._id);
    console.log('30 tempSenshi', this.tempSenshi);

    // this.tempinfo = senshiInfo;
    return this.tempSenshi.save();
  }) 
  .then( () =>{
    console.log('35 tempSenshi', this.tempSenshi);

    return this.tempSenshi;
  })
  .catch(err => Promise.reject(createError(404, err.message)))
}