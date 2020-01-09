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
      .populate('films', { title: true })
      .select({ __v: false })
      .lean()
      .then(studio => {
        studio.films.forEach(film => {
          delete film.studio;
        });
        res.send(studio);
      })
      .catch(next);
  });
