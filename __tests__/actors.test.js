require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('tests for actors routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let actor;
  let date;
  let studio;

  // eslint-disable-next-line space-before-function-paren
  beforeEach(async () => {
    date = new Date('June 1 1962');
    actor = await Actor.create({
      name: 'Merv Griffin',
      dob: date,
      pob: 'Los Angeles, California, USA'
    });

    studio = await Studio.create({
      name: 'Magnet'
    });

    film = await Film.create({
      title: 'Hackers',
      studio: studio.id,
      released: 1996,
      cast: [{
        role: 'Crash Override',
        actor: actor._id
      }]
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates an actor', () => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Merv Griffin',
        dob: date,
        pob: 'Los Angeles, California, USA'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Merv Griffin',
          dob: date.toISOString(),
          pob: 'Los Angeles, California, USA',
          __v: 0
        });
      });
  });


  // eslint-disable-next-line space-before-function-paren
  it('gets all actors', async () => {
    let actors = await Actor.create(
      { name: 'George Clooney', dob: Date.now(), pob: 'Los Angeles, California' },
      { name: 'Meryl Streep', dob: Date.now(), pob: 'Los Angeles, California' },
      { name: 'Ryan Reynolds', dob: Date.now(), pob: 'Los Angeles, California' }
    );
    return request(app)
      .get('/api/v1/actors')
      .then(res => {
        actors = JSON.parse(JSON.stringify(actors));
        actors.forEach(actor => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            name: actor.name
          });
        });

      });
  });


  // eslint-disable-next-line space-before-function-paren
  it('gets an actor by id', async () => {
    actor = await Actor.create({
      name: 'Zach Galifinakis',
      dob: Date.now(),
      pob: 'Los Angeles, California' });
    return request(app)
      .get(`/api/v1/actors/${actor._id}`)
      .then((res) => {
        actor = JSON.parse(JSON.stringify(actor));
        expect(res.body).toEqual({
          name: actor.name,
          dob: actor.dob,
          pob: actor.pob
        });
      });
  });
});
