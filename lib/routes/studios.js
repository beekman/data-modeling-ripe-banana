const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio));
  })

  // READ
  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })

  // READ
  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate('films')
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  });
