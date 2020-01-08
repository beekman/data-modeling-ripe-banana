require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');

describe('tests for reviewers routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let reviewer;
  // eslint-disable-next-line space-before-function-paren
  beforeEach(async () => {
    reviewer = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Entertainment Tonight'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });


  it('creates an reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Roger Ebert',
        company: 'Entertainment Tonight'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          // reviewerId: reviewer._id.toString(),
          name: 'Roger Ebert',
          company: 'Entertainment Tonight',
          __v: 0
        });
      });
  });


  // eslint-disable-next-line space-before-function-paren
  it('gets all reviewers', async () => {
    let reviewers = await Reviewer.create([
      {
        name: 'Roger Ebert',
        company: 'Entertainment Tonight',
      },
      {
        name: 'Gene Siskel',
        company: 'Chicago Sun Times'
      }
    ]);
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers = JSON.parse(JSON.stringify(reviewers));
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            name: reviewer.name,
            company: reviewer.company
          });
        });
      });
  });

  // eslint-disable-next-line space-before-function-paren
  it('gets an reviewer by id', async () => {
    reviewer = await Reviewer.create([
      { name: 'Roger Ebert', company: 'The Chicago Sun Times' }]);
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`, function(req, res) {
        reviewer.findOne({ _id: req.params.id })
          .then(reviewer => res.json({ reviewer }))
          .catch(error => res.json({ error: error.message }));

        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'The Chicago Sun Times'
        });
      });
  });
});
