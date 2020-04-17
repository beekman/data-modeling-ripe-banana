
require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getReviewer, getReviewers, getReview } = require('../lib/helpers/data-helpers');
const Review = require('../lib/models/Review');

describe('tests for reviewers routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'reviewer name',
        company: 'company name'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'reviewer name',
          company: 'company name',
          __v: 0,
          id: expect.any(String)
        });
      });
  });

  it('gets all reviewers', async () => {
    const reviewers = await getReviewers();

    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        reviewers.forEach(reviewer => {
          expect(res.body).toContainEqual(reviewer);
        });
      });
  });


  it('gets an reviewer by id', async () => {
    const reviewer = await getReviewer();
    return request(app)
      .get(`/api/v1/reviewers/${reviewer._id}`, function(req, res) {
        reviewer.findOne({ _id: req.params.id })
          .then(reviewer => res.json({ reviewer }))
          .catch(error => res.json({ error: error.message }));

        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Roger Ebert',
          company: 'The Chicago Sun Times',
          __v: 0
        });
      });
  });
});
