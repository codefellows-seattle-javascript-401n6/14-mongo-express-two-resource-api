'use strict';

const superagent = require('superagent');
const SenshiInfo = require('../models/senshiInfo.js');
const PORT = process.env.PORT || 3000;

require('jest');
const url = `http://localhost:${PORT}`;

const exampleInfo = {
  title: 'Sailor Saturn',
  color: 'Purple' 
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
    it('senshiInfos length should equal one', done => {
    
      superagent.post(`${url}/api/senshi/${tempSenshi.body._id}/info`)
      .send(exampleInfo)
      .then((res) => {
        expect(res.body.senshiInfos.length).toEqual(1);
        done();
      })
      .catch( err =>{
        return done(err);
      });
    });
  });
});