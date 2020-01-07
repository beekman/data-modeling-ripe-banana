const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  // READ
  .get('/studios', (req, res, next) => {
    Studio
      .find()
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })

  // READ
  .get('/studios:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate('films')
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })



  // UPDATE
  .patch('/:id', (req, res, next) => {
    Studio
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(studio => res.send(studio))
      .catch(next);
  });
