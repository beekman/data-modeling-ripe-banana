const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true,
    maxlength: 140
  },
  reviewer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reviewer'
  }],
  film: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: '_id'
  }],
});

module.exports = mongoose.model('Review', schema);
