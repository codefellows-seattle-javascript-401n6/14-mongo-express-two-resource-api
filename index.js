'use strict'
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const senshiRouter = require('./routes/senshiRouter.js')
const mongoose = require('mongoose');
// const bodyparser = require('bodyparser');

app.use('/api/senshi', senshiRouter);
//need to user bodyparser I think?
//feel like I'm missing things

app.listen(PORT,() =>{
    console.log('http://localhost:'+ PORT);
});

