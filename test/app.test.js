const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GooglePlay App', () => {
  it('should return an array of Apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      // .then(res => {
      //   expect(res.body).to.be.an('array');
      // });
  });
});