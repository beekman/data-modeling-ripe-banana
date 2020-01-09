const chance = require('chance').Chance();
const faker = require('faker').Faker();
const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Review = require('../models/Review');
const Reviewer = require('../models/Reviewer');
const Studio = require('../models/Actor');

module.exports = async ({ reviewers = 20, actors = 50, studio = 50, review = 50, film = 50 } = {}) => {
  reviewer = await Reviewer.create([...Array(reviewers)].map(() => ({
    name: chance.name({ type: 'adult' }),
    company: chance.company()
  })));

  const createdActors = await Actor.create([...Array(actors)].map(() => ({
    name: chance.name(),
    dob: chance.birthday(),
    pob: (chance.city() + chance.state() + chance.country()),
  })));

  const studios = await Studio.create([...Array(studios)].map(() => ({
    name: chance.company(),
    city: chance.city(),
    state: chance.state(),
    country: chance.country()
  })));

  const reviews = await Review.create([...Array(reviews)].map(() => ({
    rating: chance.natural({ min: 1, max: 5 }),
    review: chance.paragraph()
  })));

  const films = await Film.create([...Array(films)].map(() => ({
    title: faker.commerce.productName(),
    released: chance.birthday()
  })));



  // const createdBoxes = await Box.create([...Array(boxes)].map((_, i) => ({
  //   name: `Box ${i}`,
  //   description: chance.sentence(),
  //   color: chance.pickone(['red', 'blue', 'white', 'brown', 'yellow']),
  //   location: chance.pickone(locations.map(location => location._id))
  // })));

  // await Item.create([...Array(items)].map(() => ({
  //   name: chance.word(),
  //   description: chance.sentence(),
  //   box: chance.pickone(createdBoxes.map(box => box._id))
  // })));
};
