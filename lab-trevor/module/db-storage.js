const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Team = require('../model/teams.js').Team;
const Owner = require('../model/teams.js').Owner;

function save(newTeam, newOwner){
    console.log('new owner', newOwner)
    let teamModel = new Team({
        _id: new mongoose.Types.ObjectId(),
        location: newTeam.location,
        mascot: newTeam.mascot,
        division: newTeam.division,
    })
    
    
    return new Promise ((resolve, reject) => {
            teamModel.save((err) => {
                if (err) return handleError(err);
                let ownerModel = new Owner({
                    name: newOwner.name,
                    team: teamModel._id,
                })
                ownerModel.save((err) => {
                    if (err) return handleError(err);
                })
            
            })
    })
    console.log('saving team')
}

function remove(id) {
    console.log('delete beginning')
    return new Promise((resolve, reject) => {
        Team.remove({_id: id}, (err, team) => {
            resolve(team);
            console.log('delete complete')
        })
    })
}

function removeAll(){
    return new Promise ((resolve, reject) => {
        Team.remove((err, teams) => {
            resolve(teams);
        })
    })
}
function get(id){
    return new Promise((resolve, reject) => {
        Team.findOne({_id: id}, (err, teams) => {
            resolve(teams)
        })
    })
}
    
module.exports = {save, Team, get, removeAll, remove}
