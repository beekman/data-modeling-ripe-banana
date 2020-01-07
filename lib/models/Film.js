const mongoose = require('mongoose');
const cast = new mongoose.Schema({
  name: { type: String, required: true },
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cast: [{
    role: String,
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor'
    }
  }]

});


module.exports = mongoose.model('Film', schema);
