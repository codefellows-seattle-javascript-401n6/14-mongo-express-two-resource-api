'use strict';

const superagent = require('superagent');

const SERVER = 'http://localhost:3000';

describe('Server tests', () => {

  test('send 404 if route is not found', (done) => {
    superagent.get(SERVER + '/')
    .end((err, res) => {
      expect(res.status).toBe(404);
      done();
    });
  });

  test('send 404 if invalid ids are entered', (done) => {
    superagent.get(SERVER + '/api/notNorris')
    .end((err, res) => {
      expect(res.status).toBe(404);
      done();
    });
  });

  test.skip('send 400 for posts requests with no body', (done) => {
    superagent.post(SERVER + '/api/norris')
    .end((err, res) => {
      expect(res.status).toBe(400);
    //   expect(40).toEqual(92);
      done();
    });
  });

  test.skip('send 400 for get requests with no id', (done) => {
    superagent.post(SERVER + '/api/norris?id=')
    .end((err, res) => {
      expect(res.status).toBe(400);
    //   expect(40).toEqual(92);
      done();
    });
  });

  test.skip('send 200 for good get requests with valid id and should contain a response body for a request made with a valid id', (done) => {
    superagent.get(SERVER + '/api/norris')
    .end((err, res) => {
      let expected = res.body[0];
      let id = res.body[0]._id;
      superagent.get(`${SERVER}/api/norris?id=${id}`).end((err, res) => {
        expect(res.body).toEqual(expected);
        // expect(40).toEqual(92);
        done();
      });
    });
  });

  test.skip('send 200 for posts requests and should respond with the body content for a post request with a valid body', (done) => {
    let deltaForce2 = {
        name: "Delta Force 2",
        date: 1990,
    }
    superagent.post(SERVER + '/api/norris')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(deltaForce2))
    .end((err, res) => {
      expect(res.body.name).toEqual(deltaForce2.name);
      expect(res.body.date).toEqual(deltaForce2.date);
    //   expect(res.status).toBe(200);
      expect(40).toEqual(92);
      done();
    });
  });

});