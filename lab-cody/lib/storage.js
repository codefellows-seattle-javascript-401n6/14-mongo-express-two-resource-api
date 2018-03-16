// 'use strict';

// const mongoose = require('mongoose');

// const WuTang = require('../models/wu');

// // const cream = require('./storage');

// mongoose.connect('mongodb://localhost/test')
// .then(() => {
//     console.info('as you wish!');
// }).catch (
//     (error => {
//         console.error(`error on connection ${error}`); 
//     })
// )



// function save(wuTang) {
//     let wuModel = new WuTang({
//         name: wuTang.name,
//         lyric: wuTang.lyric,
//         chambers: wuTang.chambers,
//     });
//     return new Promise((resolve, reject)=> {
//         wuModel.save((err, savedWu)=> {
//             resolve(savedWu);
//         });
//     });
// }


// function getAll() {
//     return new Promise((resolve, reject)=> {
//         WuTang.find((err, members) =>{
//             resolve(members);
//         })
//     });
// }

// function get(id) {
//     return new Promise((resolve, reject)=> {
//         WuTang.findOne({_id: id}, (err, member)=> {
//             resolve(member);
//         })
//     });
// }


// function update(id, member) {
//     return new Promise((resolve, reject) => {
//       WuTang.findOneAndUpdate(id, member, (err, member) => {
//         resolve(member);
//       });
//     });
//   }

// function remove(id) {
//     return new Promise((resolve, reject)=> {
//         WuTang.remove({_id: id}, (err, member)=> {
//             resolve(member)
//         })
//     });
// }


// module.exports = {save, get, getAll, remove ,update};