'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Coffee = require('./coffee.js');

const Roaster = new Schema ({
    name: { type: String, required: true },
    // email: { type: String, pattern: '@mongodb\.com$', required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    coffeeReq: [{ type: Schema.Types.ObjectId, ref: 'coffee' }]
});

Roaster.findByIdAndAddCoffee = (id, coffee) => {
    return Roaster.findById(id)
    .catch(err => Promise.reject(createError(400, err.message)))
    .then(coffee => {
        coffee.coffeeReq = coffee.id;
        this.valCoffee = coffee;
        return new Coffee(coffee).save();
    })
    .then(coffee => {
        this.valCoffee.coffees.push(coffee.id);
        this.valCoffee.save();
        this.valCoffee = coffee;
    })
    .then(() => this.valCoffee);
}

// Roaster.methods.getCoffees = () => {
//     return Coffee.find({coffeeReq: this.id});
// };

module.exports = mongoose.model('roaster', Roaster);