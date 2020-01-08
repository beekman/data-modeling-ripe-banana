require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Studio = require('../lib/models/Studio');

describe('tests for studios routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let studio;
  // eslint-disable-next-line space-before-function-paren
  beforeEach(async () => {
    studio = await Studio.create({
      name: 'Magnet',
      address: 'Los Angeles, California, USA'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  // eslint-disable-next-line space-before-function-paren
  it('creates an studio', async () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: studio.name.toString(),
        address: 'Los Angeles, California, USA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: studio.name.toString(),
          state: studio.state,
          city: studio.city,
          country: studio.country,
          __v: 0
        });
      });
  });


  // eslint-disable-next-line space-before-function-paren
  it('gets all studios', async () => {
    studios = await Studio.create([
      { name: 'Universal', address: 'Los Angeles, California, USA' },
      { name: 'Paramount', address: 'Los Angeles, California, USA' },
      { name: 'Warner Bros', address: 'New York, NY, USA' }
    ]);
    return request(app)
      .get('/api/v1/studios')
      .then(res => {
        // studios = JSON.parse(JSON.stringify(studios));
        expect(res.body).toContain({
          _id: expect.any(String),
          name: studio.name.toString(),
          state: studio.state,
          city: studio.city,
          country: studio.country
        });
      });
  });

  // eslint-disable-next-line space-before-function-paren
  it('gets an studio by id', async () => {
    studio = await Studio.create([
      { name: 'Magnet', dob: Date.now(), pob: 'Los Angeles, California, USA' }]);
    return request(app)
      .get(`/api/v1/studios/${studio._id}`, function(req, res) {
        studio.findOne({ _id: req.params.id }).lean()
          .then(studio => res.json({ studio }))
          .catch(error => res.json({ error: error.message }));

        expect(res.body).toEqual({
          _id: expect.any(String),
          name: studio.name.toString(),
          state: studio.state,
          city: studio.city,
          country: studio.country
        });
      });
  });
});
