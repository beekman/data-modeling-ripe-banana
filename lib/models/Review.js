const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  // .populate('film', { name: true })
  review: {
    type: String,
    required: true,
    maxlength: 140
  },
  // reviewer RI
});

module.exports = mongoose.model('Review', schema);
