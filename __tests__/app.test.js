require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Reviewer = require('../lib/models/Reviewer');
const Actor = require('../lib/models/Actor');
const Film = require('../lib/models/Film');
const Review = require('../lib/models/Review');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async () => {
    actor = await Actor.create({
      name: 'Merv Griffin',
      dob: new Date('June 1 1962'),
      pob: 'Los Angeles, California'
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('should do something', () => {
    expect('a'.repeat(140)).toEqual('a'.repeat(140));
  });
});
