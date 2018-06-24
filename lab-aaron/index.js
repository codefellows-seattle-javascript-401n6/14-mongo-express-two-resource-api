'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const songRoutes = require('./routes/router.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

require('./lib/storage.js').seed();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/', songRoutes);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});


//Team routes
// app.get('/teams', (request, response) => {
//   if(request.query.id) {
//     Team.find({
//       _id: request.query.id
//     })
//       .populate('players')
//       .exec()
//       .then(teams => {
//         response.send(teams[i]);
//       });
//   };
// });

// app.post('/teams', (request, response) => {
//   Team.create({
//     city: request.body.city,
//     mascot: request.query.mascot,
//   }).then(team => {
//     const playerPromises = [];
//     for (player of request.body.players) {
//       const playerModel = new Player({name:player.name, team: team._id});
//       playerPromises.push(playerModel.save());
//     }
//     Promise.all(playerPromises).then(players => {
//       team.players = players;
//       team.save().then(v => {response.send(v)})
//     })
//   })
// })