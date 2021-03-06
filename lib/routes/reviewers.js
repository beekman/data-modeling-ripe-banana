const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewers => res.send(reviewers))
      .catch(next);
  })

  //https://stackoverflow.com/questions/19222520/populate-nested-array-in-mongoose
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate({
        path: 'reviews',
        select: 'rating review film -reviewer',
        populate: {
          path: 'film',
          select: 'title'
        }
      })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  //UPDATE
  .patch('/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  //DELETE
  .delete('/:id', (req, res, next) => {
    Reviewer
      .findReviews(req.params.id)
      .then(reviews => {
        if(!reviews[0]) {
          Reviewer
            .findByIdAndDelete(req.params.id)
            .then(reviewer => res.send(reviewer));
        } else {
          throw 'Cannot delete reviewer that has reviews';
        }
      })
      .catch(next);
  });
