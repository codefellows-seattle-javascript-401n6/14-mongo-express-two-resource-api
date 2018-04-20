'use strict'
const express = require('express');
const router = express.Router();

const Senshi = require('../models/senshi.js');
const senshiMongoose = require('../models/senshiMongoose.js');
const mongoose = require('mongoose');

router.get('/api/senshi/:senshiId0', (req, res, next) =>{
    Senshi.findById(req.params.senshiId)
    .then(senshi => res.json(senshi))
    .catch(next);
  });
  //not seeing it on the browser//

router.get(`/:id`,(req,res)=>{
 
    res.send(senshi);
    console.log('get senshi',senshi)
});
// router.post(`/`,(req,res)=>{
//     const senshi = [new Senshi('Sailor Jupiter','  Makoto Kino',' Lightning Magic/Martial Arts',' Inner Senshi')]
//     res.send(JSON.stringify(senshi));
// });

// router.put(`/`,(req,res)=>{
//     const senshi = [new Senshi('Sailor Jupiter','  Makoto Kino',' Lightning Magic/Martial Arts',' Inner Senshi')]
//     res.send(JSON.stringify(senshi));
// });
//delete wont need a route
router.delete(`/`,(req,res)=>{
    senshiMongoose.deleteSenshi()
    .then((data) =>{
    res.send(data),
    console.log('done with get', data)
    }) 
});
module.exports = router;

