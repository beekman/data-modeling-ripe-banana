const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  // READ
  .get('/reviewer', (req, res, next) => {
    Reviewer
      .find()
      .select({ __v: false })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })
  //READ
  .get('/reviewer/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate('reviews')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  //UPDATE
  .patch('reviewer/:id', (req, res, next) => {
    Reviewer
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(reviewer => res.send(reviewer))
      .catch(next);
  })

  //DELETE
  .delete('/reviewer/:id', (req, res, next) => {
    Reviewer
      .findByIdAndDelete(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
