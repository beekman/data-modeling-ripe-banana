const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()


  //CREATE
  .post('/', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })

  // READ
  .get('/', (req, res, next) => {
    Actor
      .find()
      .select({ __v: false,
        dob: false,
        pob: false })
      .then(actor => res.send(actor))
      .catch(next);
  })

  // READ
  .get('/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', 'title released')
      .then(studio => res.send(studio))
      .catch(next);
  });
