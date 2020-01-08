const Review = require('../lib/models/Review');
const Reviewer = require('../lib/models/Reviewer');
const Film = require('../lib/models/Film');
const Studio = require('../lib/models/Studio');

describe('Review model', () => {
  const studio = new Studio({
    name: 'Boise Studios'
  });

  const reviewer = new Reviewer({
    name: 'Megaman',
    company: 'Super Reviews'
  });

  const film = new Film({
    title: 'The Megaman Story',
    studio: studio.id,
    released: 2015
  });


  it('has a required review', () => {
    const review = new Review({
      reviewer: reviewer.id,
      rating: 5,
      film: film.id
    });

    const { errors } = review.validateSync();

    expect(errors.review.message).toEqual('Path `review` is required.');
  });

  it('has a required rating', () => {

    const review = new Review({
      reviewer: reviewer.id,
      review: 'Yawn.',
      film: film.id
    });

    const { errors } = review.validateSync();
    expect(errors.rating.message).toEqual('Path `rating` is required.');
  });


  it('Rating is greater than 0', () => {
    const review = new Review({
      rating: 0,
      reviewer: reviewer.id,
      review: 'Yawn.',
      film: film.id
    });

    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (0) is less than minimum allowed value (1).');
  });

  it('Rating is less than 6', () => {

    const review = new Review({
      rating: 6,
      review: 'Bad'
    });

    const { errors } = review.validateSync();

    expect(errors.rating.message).toEqual('Path `rating` (6) is more than maximum allowed value (5).');
  });
});
