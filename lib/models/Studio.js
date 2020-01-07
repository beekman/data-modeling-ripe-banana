const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
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

schema.pre('find', function() {
  this.populate('films');
});

module.exports = mongoose.model('Studio', schema);
