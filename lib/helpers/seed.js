const chance = require('chance').Chance();
// const faker = require('faker');
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Studio');

// eslint-disable-next-line space-before-function-paren
module.exports = async ({ numActors = 5, numFilms = 5, numReviews = 5, numReviewers = 5, numStudios = 5 } = {}) => {

  const studios = await Studio.create([...Array(numStudios)].map(() => ({
    name: chance.name(),
    address: {
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }
  })));

  const reviewers = await Reviewer.create([...Array(numReviewers)].map(() => ({
    name: chance.name(),
    company: chance.company()
  })));

  const actors = await Actor.create([...Array(numActors)].map(() => ({
    name: chance.name()
  })));

  const films = await Film.create([...Array(numFilms)].map(() => ({
    title: chance.word(),
    released: chance.year(),
    studio: chance.pickone(studios.map(studio => studio._id)),
    cast: [{
      role: chance.character(),
      actor: chance.pickone(actors.map(actor => actor._id))
    }, {
      role: chance.character(),
      actor: chance.pickone(actors.map(actor => actor._id))
    }]
  })));

  await Review.create([...Array(numReviews)].map(() => ({
    rating: chance.integer({ min: 1, max: 5 }),
    review: chance.string({ length: 140 }),
    reviewer: chance.pickone(reviewers.map(reviewer => reviewer._id)),
    film: chance.pickone(films.map(film => film._id))
  })));

};
