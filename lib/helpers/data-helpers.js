require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(async () => {
  return seed({ numActors: 1, numFilms: 1, numReviews: 1, numReviewers: 1, numStudios: 1 });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: (query) => Model.findOne(query).then(prepare),
    [`get${modelName}s`]: (query) => Model.find(query).then(docs => docs.map(prepare)),
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Film),
  ...createGetters(Review),
  ...createGetters(Reviewer),
  ...createGetters(Studio)

};
