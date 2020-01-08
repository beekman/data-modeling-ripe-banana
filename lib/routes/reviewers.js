const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', (req, res) => {
    Reviewer
      .create(req.body)
      .then(reviewer => res.send(reviewer));
  })

  // READ ALL
  .get('/', (req, res, next) => {
    Reviewer
      .find()
      .select({ __v: false })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  //READ ONE
  .get('/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate('reviews')
      .populate('films')
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
      .findByIdAndDelete(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
