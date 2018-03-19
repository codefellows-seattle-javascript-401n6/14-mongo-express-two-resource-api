const mongoose = require('mongoose');

let teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    location: String,
    mascot: String,
    division: String,
    owner: [{type: mongoose.Schema.Types.ObjectId, ref: 'Owner'}]
});

let ownerSchema = mongoose.Schema({
    name: String,
    team: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
});

let Team = mongoose.model('Team', teamSchema);
let Owner = mongoose.model('Owner', ownerSchema);

module.exports = {Team, Owner};