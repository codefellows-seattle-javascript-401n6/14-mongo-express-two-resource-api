// 'use strict';
// const mongoose = require('mongoose');
// const mongodb = require('./storage');
// const WuTang = require('../models/wu');

// mongoose.connect('mongodb://localhost/test')
// .then(() => {
//     console.info('yep its up and running');
// }).catch (
//     (error => {
//         console.error(`error on connection ${error}`); 
//     })
// )

// function cream(storage) {
//     return storage.removeAll()
//     .then(() => {
//         return Promise.all([
//             storage.save(new WuTang({name: 'RZA', lyric:'Ruler Zig-Zag-Zig Allah jam is fatal Quick to stick my Wu-Tang sword right through your navel', chambers: 36})),
//             storage.save(new WuTang({name: 'Method Man', lyric:'This rhyme has no limitations, this time there\'s no hesitation Collecting minds at the door, you want it fellas it\'s yours The flavors raw, what the f*** you think I\'m flowing for It\'s rhyme and reason, bite the bullet Fellas is foul and its duck season', chambers: 36})),
//             storage.save(new WuTang({name: 'Ol\' Dirty Bastard', lyric:'Huff? Puff? I\'m gonna catch your bluff tuff Rough, kicking rhymes like Jim KellyOr Alex Haley I\'m a Mi-..Beetle Bailey rhymes', chambers: 36})),
//             storage.save(new WuTang({name: 'GhostFace Killah', lyric:'I\'d rather flip shows instead of those Hanging on my living room wall My first joint - and it went gold!', chambers: 36})),
//             storage.save(new WuTang({name: 'Raekwon', lyric:'A young youth, rocking the gold tooth, \'Lo goose Only way I begin to G off was drug loot Figured out I went the wrong route So I got with a sick-a** clique and went all out Catching keys from across seas Rolling in MPV\'s every week we made forty G\'s', chambers: 36})),
//             storage.save(new WuTang({name: 'GZA', lyric:'This Witty Unpredictable shot is critical To analytical analogy, insurance policies why Said he know that sounds define the note Couldn\'t recognize, blast him the f*** behind the ropes', chambers: 36})),

//             console.log(storage)

//         ])
//     });
// }

// module.exports = {mongodb, cream}; 