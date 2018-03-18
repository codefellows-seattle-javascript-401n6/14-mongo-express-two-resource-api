'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Roaster = require('./roaster.js');

mongoose.connect('mongodb://localhost/coffees');

const Coffee = new Schema ({
    origin: { type: String, required: true, unique: true },
    roast: [{ type: Schema.Types.ObjectId, ref: 'roaster' }],
    cost: { type: Number, required: true },
});

module.exports = mongoose.model('coffee', Coffee);