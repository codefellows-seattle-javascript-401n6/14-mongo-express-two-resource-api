'use strict';

const superagent = require('superagent');

const SERVER_URL = 'http://localhost:3000';

describe('Server tests', () => {

  test('throws 404 if route is not found', (done) => {
    superagent.get(SERVER_URL + '/api/wrongurl')
    .end((err, res) => {
      expect(res.status).toBe(404);
      done();
    });
  });

  test('returns 200 for good get requests with no id', (done) => {
    let expected;
    superagent.get(SERVER_URL + '/api/leads')
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      expect(res.status).toBe(200);
      done();
    });
  });

  test('returns 200 for good get requests with valid id and should contain a response body for a request made with a valid id', (done) => {
    let expected;
    superagent.get(SERVER_URL + '/api/leads')
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      expected = res.body[0];
      let id = res.body[0]._id;
      superagent.get(`${SERVER_URL}/api/leads?id=${id}`).end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        expect(res.body.lead.email).toEqual(expected.email);
        done();
      });
    });
  });

  test('returns 200 for posts requests and should respond with the body content for a post request with a valid body', (done) => {
    let randomNum = Math.random();
    let newEmail = `${randomNum}@email.com`;
    let newLead = {
      "name": "John Doe",
      "company": "JD, LLC",
      "email": newEmail,
      "quote": {
          "cost": 60000
      }
    }
    superagent.post(SERVER_URL + '/api/leads')
    .set('Content-Type', 'application/json')
    .send(JSON.stringify(newLead))
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      expect(res.body.name).toEqual(newLead.name);
      expect(res.body.company).toEqual(newLead.company);
      expect(res.body.email).toEqual(newLead.email);
      expect(res.status).toBe(200);
      done();
    });
  });

  test('returns 200 for good post requests with valid id', (done) => {
    let updatedLead;
    superagent.get(SERVER_URL + '/api/leads')
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      updatedLead = res.body[0];
      updatedLead.email = `${Math.random()}@email.com`;
      delete updatedLead._id;
      let id = res.body[0]._id;
      superagent.put(`${SERVER_URL}/api/leads?id=${id}`)
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

  test('returns 204 for good delete requests with valid id', (done) => {
    let deleteLead;
    superagent.get(SERVER_URL + '/api/leads')
    .end((err, res) => {
      if (err) {
        console.error(err);
      }
      deleteLead = res.body[0];
      let id = res.body[0]._id;
      superagent.delete(`${SERVER_URL}/api/leads?id=${id}`)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        console.log('response body', res.text);
        expect(res.status).toBe(204);
        done();
      });
    });
  });

});