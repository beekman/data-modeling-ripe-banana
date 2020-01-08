const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', (req, res) => {
    Review
      .create(req.body)
      .then(review => res.send(review));
  })
  // READ ALL
  .get('/', (req, res, next) => {
    Review
      .find()
      .select({ __v: false })
      .then(review => res.send(review))
      .catch(next);
  })
  //READ ONE
  .get('/:id', (req, res, next) => {
    Review
      .findById(req.params.id)
      .populate('reviews')
      .populate('films')
      .then(review => res.send(review))
      .catch(next);
  })

  //UPDATE
  .patch('/:id', (req, res, next) => {
    Review
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(review => res.send(review))
      .catch(next);
  })

  //DELETE
  .delete('/:id', (req, res, next) => {
    Review
      .findByIdAndDelete(req.params.id)
      .then(review => res.send(review))
      .catch(next);
  });
