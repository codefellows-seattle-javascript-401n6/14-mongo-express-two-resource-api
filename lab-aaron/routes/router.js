'use strict';

//REFACTOR

const express = require('express');
const router = express.Router();
const Song = require('../models/song.js');
const storage = require('../lib/storage.js');

// console.log('STORaGE',storage);
//GET
router.get('/songs', (request, response) => {
  if (request.query.id) {
    let id = request.query.id;
    storage.get(id)
      .then(song => {
        response.send(song);
      });
  } else {
    storage.getAll()
      .then(songs => {
        response.send(songs);
      });
  };
});

//POST
router.post('/songs', (request, response) => {
  let song = {
    title: request.body.title,//http POST :3000 
    composer: request.body.composer,
    difficulty: request.body.difficulty
  };

  storage.save(song)
    .then(song => {
      response.status(200);
      response.send(song);
    });
});

//PUT
router.put('/songs', (request, response) => {
  console.log('router.put hit');
  let id = request.query.id;
  storage.get(id)
    .then(song => {
      console.log('route-46',song);
      if(request.body.title) {
        song.title = request.body.title;
      }
      if(request.body.composer) {
        song.composer = request.body.composer;
      }
      if(request.body.difficulty) {
        song.difficulty = request.body.difficulty;
      }

      song.save((error, song) => {
        if(error) {
          throw(error);
        };
        response.send(song);
      });
    });
});

//DELETE
router.delete('/songs', (request, response) => {
  if(request.query.id) {
    let id = request.query.id;
    storage.remove(id)
      .then(song => {
        response.send(`Song Removed ${song}`);
      });
  } else {
    storage.removeAll()
      .then(songs => {
        response.send(`All songs removed ${songs}`);
      });
  };
});

module.exports = router;

