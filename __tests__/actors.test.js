require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');

describe('tests for actors routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  let date;
  beforeEach(async () => {
    date = new Date('June 1 1962');
    actor = await Actor.create({
      name: 'Merv Griffin',
      dob: date,
      pob: 'Los Angeles, California'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        // actorId: actor._id,
        name: 'Merv Griffin',
        dob: date,
        pob: 'Los Angeles, California'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          // actorId: actor._id.toString(),
          name: 'Merv Griffin',
          dob: date.toISOString(),
          pob: 'Los Angeles, California',
          __v: 0
        });
      });
  });


  it('gets all actors', async () => {
    let actors = await Actor.create([
      { name: 'George Clooney', dob: Date.now(), pob: 'Los Angeles, California' },
      { name: 'Meryl Streep', dob: Date.now(), pob: 'Los Angeles, California' },
      { name: 'Ryan Reynolds', dob: Date.now(), pob: 'Los Angeles, California' }
    ]);
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors = JSON.parse(JSON.stringify(actors));
        actors.forEach(actor => {
          expect(res.body).toContainEqual({ _id: actor._id.toString(), name: actor.name });
        });
      });
  });

  it('gets an actor by id', async () => {
    let actor = await Actor.create([
      { name: 'Zach Galifinakis', dob: Date.now(), pob: 'Los Angeles, California' }]);
    return request(app)
      .get(`/api/v1/actors/${actor._id}`, function(req, res) {
        actor.findOne({ _id: req.params.id }).lean().
          then(actor => res.json({ actor })).
          catch(error => res.json({ error: error.message }));

        expect(res.body).toContainEqual({ name: actor.name });
      });
  });
});
