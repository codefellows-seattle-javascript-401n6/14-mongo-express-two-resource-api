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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
  describe('PUT: /api/senshi/:senshiId', function(){
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
          done();
        });
      });
 
      it('update a senshi', done => {

        let newInfo = { age:'13' };

        superagent.put(`${url}/api/senshi/${tempSenshi.body._id}`)
        .send(newInfo)
        .end((err,res) => {
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.age).toEqual('13');
          console.log('61 put',res.body.age);
          done();
        });
      });
    });
  });
  /////////////////////////////////////////////////////////////////////////////////////////////////////  
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
          done();
        });
      });
 
      it('should return a senshi', done => {
    
        superagent.get(`${url}/api/senshi/${tempSenshi.body._id}`)
        .end((err, res) =>{
          console.log('88 url ', `${url}/api/senshi/${tempSenshi.body._id}`)
          if(err) return done(err);
          expect(res.status).toEqual(200);
          expect(res.body.name).toEqual('Usagi Tsukino');

          done();
        });
      });
    });
  });
////////////////////////////////////////////////////////////////////////////////////////////////////
describe('DELETE: /api/senshi/:senshiId', function(){
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
        done();
      });
    });

    it('should return a senshi', done => {
      superagent.delete(`${url}/api/senshi/${tempSenshi.body._id}`)
      .end((err, res) =>{
        if(err) return done(err);

        expect(res.status).toEqual(204);
        done();
      });
    });
  });
});
  
});
