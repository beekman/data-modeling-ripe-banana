require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const { getReview, getFilm, getReviewer, getReviews } = require('../lib/helpers/data-helpers');
const chance = require('chance').Chance();
const Review = require('../lib/models/Review');


describe('review routes', () => {
  it('creates a review', async() => {
    const testFilm = await getFilm();
    const testReviewer = await getReviewer();

    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 1,
        reviewer: testReviewer._id,
        review: 'its ok',
        film: testFilm._id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          rating: 1,
          reviewer: testReviewer._id.toString(),
          review: 'its ok',
          film: testFilm._id.toString(),
          __v: 0
        });
      });
  });

  it('gets all reviews', async() => {
    const reviews = await getReviews();
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(reviews);
      });
  });

  it('can delete a review', async () => {
    const review = await getReview();
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review._id,
          id: review.id,
          rating: review.rating,
          reviewer: review.reviewer,
          review: review.review,
          film: review.film,
          __v: 0
        });
      });
  });
});
