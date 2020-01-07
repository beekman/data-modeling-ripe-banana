const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studio: {
    city: String,
    state: String,
    country: String
  }
});

//virtual "films" property that gets populated with any Film model that contains the "studio" property matching that Studio's "_id"
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

teams.pre('find', function() {
  this.populate('players');
});

module.exports = mongoose.model('Studio', schema);
