'use strict';

const superagent = require('superagent');

const SERVER_URL = 'http://localhost:3000';

describe('Contact tests', () => {
  test('throws 404 if route is not found', done => {
    superagent.get(SERVER_URL + '/api/nonono').end((err, res) => {
      expect(res.status).toBe(404);
      done();
    });
  });

  test('returns 200 for good get requests with no id', done => {
    let expected;
    superagent.get(SERVER_URL + '/api/beers').end((err, res) => {
      if (err) {
        console.error(err);
      }
      expect(res.status).toBe(200);
      done();
    });
  });

  test('returns 200 for good get requests with valid id and should contain a response body for a request made with a valid id', done => {
    let expected;
    superagent.get(SERVER_URL + '/api/beers').end((err, res) => {
      if (err) {
        console.error(err);
      }
      expected = res.body[0];
      let id = res.body[0]._id;
      superagent.get(`${SERVER_URL}/api/beers?id=${id}`).end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        expect(res.body.email).toEqual(expected.email);
        done();
      });
    });
  });

  test('returns 200 for posts requests and should respond with the body content for a post request with a valid body', done => {
    let newBeer = {
      name: 'Ninja Porter',
      style: 'Porter',
      abv: 5.6,
      recipeId: {
        hops: 'Cascade'
      }
    };
    superagent
      .post(SERVER_URL + '/api/beers')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify(newBeer))
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.body.name).toEqual(newBeer.name);
        expect(res.body.style).toEqual(newBeer.style);
        expect(res.body.abv).toEqual(newBeer.abv);
        expect(res.status).toBe(200);
        done();
        expect(res.body.recipeId.hops).toBe(newBeer.recipeId.hops);
        done();
      });
  });
});
