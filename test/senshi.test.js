'use strict';

const superagent = require('superagent');
const Senshi = require('../models/senshi.js');
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');


require('jest');

const url = 'http://localhost:3000';
const exampleSenshi = {
  name:'Usagi Tsukino',
  age:'16'
};

describe('Senshi Routes', function(){
  describe('POST:/api/senshi', function(){
    describe('valid reqest body', function(){

      it('should return a senshi', done => {
        console.log('31 url',`${url}/api/senshi`);
        superagent.post('http://localhost:3000/api/senshi')
        .send(exampleSenshi)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Usagi Tsukino');
    
          done();
        });
      });
    });
  });
  describe('GET: /api/senshi/:senshiId', function(){
    describe('valid request body', function(){
      let tempSenshi = '';
      beforeEach(done => {  
       
        superagent.post('http://localhost:3000/api/senshi')
        .send(exampleSenshi)
        .then(senshi => {
          tempSenshi = senshi;
          done();
        })
        .catch(done => {
          console.log('57......');
          done();
        });
      });
  
      it('should return a senshi', done => {
    
        superagent.get(`${url}/api/senshi/${tempSenshi.body._id}`)
        .end((err, res) =>{
       
          if(err) return done(err);
         
          expect(res.status).toEqual(200);
          console.log('78 res.body.name', res.body.name);
          console.log('79 err', err);
  
          expect(res.body.name).toEqual('Usagi Tsukino');
          console.log('81 res.body.name after expect', res.body.name);
          done();
        });
      });
    });
  });

  
});

