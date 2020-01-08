require('dotenv').config();
const connect = require('../utils/connect');
const mongoose = require('mongoose');
const seed = require('./seed');
const actor = require('../models/Actor');
const film = require('../models/Film');
const review = require('../models/Review');
const reviewer = require('../models/Reviewer');
const studio = require('../models/Actor');

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seed({
    // location: 5, boxes: 25, items: 100
  });
});

afterAll(() => {
  return mongoose.connection.close();
});

const prepare = doc => JSON.parse(JSON.stringify(doc));

const createGetters = Model => {
  const modelName = Model.modelName;

  return {
    [`get${modelName}`]: () => Model.findOne().then(prepare),
    [`get${modelName}s`]: () => Model.find().then(docs => docs.map(prepare))
  };
};

module.exports = {
  ...createGetters(Actor),
  ...createGetters(Film),
  ...createGetters(Review),
  ...createGetters(Reviewer),
  ...createGetters(Studio),
  // getLocation: () => Location.findOne().then(prepare),
  // getLocations: () => Location.find().then(docs => docs.map(prepare)),
  // getBox: () => ,
  // getItem: () => item
};
