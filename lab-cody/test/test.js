'use strict';

const superagent = require('superagent');

const SERVER_URL = 'http://localhost:3000';

describe('Contact tests', () => {

  test('throws 404 if route is not found', (done) => {
    superagent.get(SERVER_URL + '/api/nonono')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done();
      });
  });

  test('returns 200 for good get requests with no id', (done) => {
    let expected;
    superagent.get(SERVER_URL + '/api/beers')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        done();
      });
  });

  test.skip('returns 200 for good get requests with valid id and should contain a response body for a request made with a valid id', (done) => {
    let expected;
    superagent.get(SERVER_URL + '/api/beers')
      .end((err, res) => {
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

  test('returns 200 for posts requests and should respond with the body content for a post request with a valid body', (done) => {
   
    let newBeer = {
      'name': 'Ninja Porter',
      'style': 'Porter',
      'abv': 5.6,
      'recipeId': {
        'fermentables': 'Chocolate Malt',
        'hops': 'Cascade',
        'yeast': 'London Ale Yeast'
      }
    };
    superagent.post(SERVER_URL + '/api/beers')
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
        expect(res.body.recipeId.fermentables).toBe(newBeer.recipeId.fermentables);
        expect(res.body.recipeId.hops).toBe(newBeer.recipeId.hops);
        expect(res.body.recipeId.yeast).toBe(newBeer.recipeId.yeast);
        done();


        // done();
      });
  });

  test.skip('returns 200 for good post requests with valid id', (done) => {
    let updatedLead;
    superagent.get(SERVER_URL + '/api/contacts')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        updatedLead = res.body[0];
        updatedLead.email = `${Math.random()}@email.com`;
        delete updatedLead._id;
        let id = res.body[0]._id;
        superagent.put(`${SERVER_URL}/api/contacts?id=${id}`)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(updatedLead))
          .end((err, res) => {
            if (err) {
              console.error(err);
            }
            expect(res.status).toBe(200);
            expect(res.text).toEqual('updated successfully');
            done();
          });
      });
  });

  test.skip('returns 204 for good delete requests with valid id', (done) => {
    let deleteLead;
    superagent.get(SERVER_URL + '/api/contacts')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        deleteLead = res.body[0];
        let id = res.body[0]._id;
        superagent.delete(`${SERVER_URL}/api/contacts?id=${id}`)
          .end((err, res) => {
            if (err) {
              console.error(err);
            }
            expect(res.status).toBe(204);
            done();
          });
      });
  });

});