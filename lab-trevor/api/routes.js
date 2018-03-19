const mongoos = require('mongoose');
const express = require('express');
const router = express.Router();
const db = require('../module/db-storage.js');
const storage = require('../module/storage.js');
const Team = require('../model/teams').Team;
const Owner = require('../model/teams').Owner;

//dont need /city because you already used it in the server.js
router.get('/', (req,res) => {
    if(req.query.id){
        db.Team.findOne({_id:req.query.id})
        .then((results) => {
            res.send(results)
        })
    } else {
        db.Team.find()
        .then((results) =>{
            console.log(results)
            res.send(results);
        })
    }
});

router.delete('/', (req, res) =>{
    let id = req.query.id;
    console.log(id)
    console.log('mongodb', db.Team.remove)
    db.remove(id)

    .then(reseult => {
        res.send('delete complete');
    }).catch(err => {
        res.send('uh oh')
    })
})

router.post('/', (req, res) => {
    let newTeam = {
        location: req.body.location,
        mascot: req.body.mascot,
        division: req.body.division,
    }
    db.save(newTeam)
    .then(newTeam => {
        res.sendStatus(200);
    })
    console.log('add complete')
})

router.put('/', (req, res) => {
    let id = req.query.id;
    db.get(id)
    .then(team => {
        if(req.body.location){
            team.location = req.body.location
        }
        if(req.body.mascot){
            team.mascot = req.body.mascot
        }
        if(req.body.division){
            team.division = req.body.division
        }
        team.save(team)
        .then(team => {
            db.Team.find()
        .then((results) =>{
            res.send(results);
        })
        })
    })
    console.log('update comlete')
})


module.exports = router;