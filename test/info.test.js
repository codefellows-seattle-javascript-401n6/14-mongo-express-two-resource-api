'use strict';

const superagent = require('superagent');
// const Senshi = require('../models/senshi.js');
const SenshiInfo = require('../models/senshiInfo.js');
const PORT = process.env.PORT || 3000;

require('jest');
const url = `http://localhost:${PORT}`;

const exampleInfo = {
  title: 'Sailor Saturn',
  color : 'Purple' 
};

const exampleSenshi = {
  name: 'Hotaru Tomoe',
  age: '14'  
};

describe('Info Routes', function(){
  describe('POST: /api/senshi/:senshiId/info', () => {
    let tempSenshi = '';
    beforeEach(done => {  
      superagent.post('http://localhost:3000/api/senshi')
      .send(exampleSenshi)
      .then(senshi => {
        tempSenshi = senshi;
        done();
      })
      .catch(done => {
        done();
      });
    });
//info post is working, the data isn't making it into that end block for some reason. 
    it('should return info', done => {
    
      superagent.post(`${url}/api/senshi/${tempSenshi.body._id}/info`)
      .send(exampleInfo)
      .end((err, res) => {
        console.log('42 res...............');
        console.log('43 res', res);
        if(err) {
          return done(err);
        }
        expect(res.body.senshiInfos).toEqual([`${tempSenshi.body._id}`]);
        done();
      })
      .catch( err =>{
        return done(err);
      });
    });
  });
});