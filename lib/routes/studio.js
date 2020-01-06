const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()

  // READ
  .get('/studios:id', (req, res, next) => {
    Studio
      .find()
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  })

  // READ
  .get('/studios', (req, res, next) => {
    Studio
      .find()
      .select({ __v: false })
      .then(studio => res.send(studio))
      .catch(next);
  });

// // UPDATE
// .patch('/:id', (req, res, next) => {
//   const { id } = req.params;
// })

// // DELETE
// .delete('/:id', (req, res, next) => {

// });
