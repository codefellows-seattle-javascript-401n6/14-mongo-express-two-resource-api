'use strict' ;

const mongoose = require('mongoose');

const carSchema = mongoose.Schema ({
    make: String;
    color: String;
    Year: Number,
});

let Car = mongoose.model('Car', carSchema);

module.exports = Car;