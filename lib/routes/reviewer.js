const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()

  // // READ
  .get('/reviewer/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .populate('owner')
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
