require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Studio = require('../lib/models/Studio');
const Film = require('../lib/models/Film');

describe('tests for reviews routes', () => {

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  let review;
  let reviewer;
  let reviews;
  let film;
  let studio;
  // eslint-disable-next-line space-before-function-paren
  beforeEach(async () => {
    studio = await Studio.create({
      name: 'Lionsgate Studios'
    });

    reviewer = await Reviewer.create({
      name: 'Roger Ebert',
      company: 'Entertainment Tonight'
    });

    review = await Review.create({
      rating: 3,
      reviewer: reviewer.id,
      review: 'Meh',
      film: film.id
    });

    film = await Film.create({
      title: 'Inception',
      released: 1927,
      studio: studio.id
    });

    reviews = await Review.create([
      {
        name: 'Roger Ebert',
        company: 'Entertainment Tonight',
      },
      {
        name: 'Gene Siskel',
        company: 'Chicago Sun Times'
      }
    ]);
  });

  it('creates an review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 3,
        review: 'Bad',
        reviewer: reviewer.id,
        film: film.id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 3,
          review: 'Bad',
          reviewer: 'Roger Ebert',
          film: film.id,
          __v: 0
        });
      });
  });

  // eslint-disable-next-line space-before-function-paren
  it('gets all reviews', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        reviews = JSON.parse(JSON.stringify(reviews));
        reviews.forEach(review => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            name: review.name,
            company: review.company
          });
        });
      });
  });

  // eslint-disable-next-line space-before-function-paren
  it('gets an review by id', async () => {
    review = await Review.create([
      { reviewer: 'Roger Ebert', review: 'The Chicago Sun Times', rating: 5 }]);
    return request(app)
      .get(`/api/v1/reviews/${review._id}`, function(req, res) {
        review.findOne({ _id: req.params.id })
          .then(review => res.json({ review }))
          .catch(error => res.json({ error: error.message }));

        expect(res.body).toEqual({
          _id: expect.any(String),
          reviewer: 'Roger Ebert', review: 'The Chicago Sun Times', rating: 5
        });
      });
  });
  it('can create a new review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 5,
        reviewer: reviewer.id,
        review: 'Like OMG so good WTF',
        film: film.id
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          rating: 5,
          reviewer: reviewer.id,
          review: 'Like OMG so good WTF',
          film: film.id,
          __v: 0
        });
      });
  });

  it('can delete a review', () => {
    return request(app)
      .delete(`/api/v1/reviews/${review.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: review.id,
          rating: 5,
          reviewer: reviewer.id,
          review: 'By far the most meaningful film I have ever had the priviledge to witness.',
          film: film.id,
          __v: 0
        });
      });
  });
});
