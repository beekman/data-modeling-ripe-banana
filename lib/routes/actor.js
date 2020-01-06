const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()

  // // READ
  .get('/actor/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('owner')
      .then(actor => res.send(actor))
      .catch(next);
  });

// // READ
// .get('/', (req, res, next) => {
//   Dog
//     .find()
//     .select({ _id: false, weight: false })
//     // [{ _id: '1234', name: 'spot', age: 5 }, { _id: '3456', name: 'rover', age: 10 }]
//     .then(dogNames => res.send(dogNames));
// })

// // UPDATE
// .patch('/:id', (req, res, next) => {
//   const { id } = req.params;
// })

// // DELETE
// .delete('/:id', (req, res, next) => {

// });
