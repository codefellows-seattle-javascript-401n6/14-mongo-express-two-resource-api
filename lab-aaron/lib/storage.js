'use strict';

//REFACTOR

const Song = require('../models/song.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
// console.log(Song);
//SEED
const seed = () => {
  console.log('start', Song);
  removeAll()
    .then(() => {
      return Promise.all([
        save(new Song({title: 'Wings of Piano', composer: 'V.K.', difficulty: 7})),
        save(new Song({title: 'Sunset', composer: 'Alex Vourtsanis', difficulty: 8})),
        save(new Song({title: 'Holy Knight', composer: 'Eyemedia', difficulty: 7}))
      ]);
    });
};

//SAVE
const save = (song) => {
  let songModel = new Song({
    title: song.title,
    composer: song.composer,
    difficulty: song.difficulty
  });

  return new Promise((resolve, reject) => {
    songModel.save((error, savedSong) => {
      if(error) {
        throw error;
      };
      resolve(savedSong);
    });
  });
};

const get = (id) => {
  return new Promise((resolve, reject) => {
    Song.findOne({_id: id}, (error, songs) => {
      resolve(songs);
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    Song.find((error, songs) => {
      resolve(songs);
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    Song.remove({_id: id}, (error, song) => {
      resolve(song);
    });
  });
};

const removeAll = () => {
  return new Promise((resolve, reject) => {
    Song.remove((error, songs) => {
      if(error) {
        console.error(error);
      }
      resolve(songs);
    });
  });
};

module.exports = {seed, save, get, getAll, remove, removeAll};
