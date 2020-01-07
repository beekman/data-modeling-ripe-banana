const { Router } = require('express');
const Film = require('../models/Film');
module.exports = Router()

  .get('/films', (req, res, next) => {
    Film
      .find()
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .then(films => {
        res.send(films);
      })
      .catch(next);
  })

  .get('/film/:id', (req, res, next) => {
    Film
      .findById(req.params.id)
      .populate('studio', { name: true })
      .populate('cast.actor', { name: true })
      .then(film => {
        res.send(film);
      })
      .catch(next);
  });
