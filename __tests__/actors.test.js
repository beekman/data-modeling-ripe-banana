require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getActor, getActors } = require('../lib/helpers/data-helpers');

describe('actors routes', () => {
  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'natalie portman',

      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'natalie portman',
          __v: 0
        });
      });
  });



  it('gets all actors', async () => {
    const actors = await getActors();
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors.forEach(actor => {
          delete actor.__v;
          expect(res.body).toContainEqual(actor);
        });
      });
  });

  it('gets an actor by id', async () => {
    const testActor = await getActor();

    return request(app)
      .get(`/api/v1/actors/${testActor.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: testActor.id,
          id: expect.any(String),
          name: testActor.name,
          films: [],
          __v: 0
        });
      });
  });
});
