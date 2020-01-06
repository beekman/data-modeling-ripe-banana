const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()

  // READ
  .get('/actors', (req, res, next) => {
    Actor
      .find()
      .select({ __v: false, dob: false, pob: false })
      .then(actor => res.send(actor))
      .catch(next);
  })

  // READ
  .get('/actors/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .select({ _id: false, __v: false })
      .then(actor => res.send(actor))
      .catch(next);
  });
