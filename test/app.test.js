const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GooglePlay App', () => {
  it('should return an array of Apps', () => {
    return supertest(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        const app = res.body[0];
        expect(app).to.include.all.keys('App', 'Genres', 'Rating');
      });
  });

  it('should be 400 is no genre is given', () => {
    return supertest(app)
      .get('/apps')
      .query({genres: ''})
      .expect(400);
  });

  it('should be 400 if genres is invalid', () => {
    return supertest(app)
      .get('/apps')
      .query({ genres : 'Mystery'})
      .expect(400, 'Genres must be one of the following: Action, Puzzle, Strategy, Casual, Arcade, Card');
  });

  it('sort should be by rating or app', () => {
    return supertest(app)
      .get('/apps')
      .query({sort : 'Price'})
      .expect(400, 'Sort must be set by "Rating" or "App"');
  });
});