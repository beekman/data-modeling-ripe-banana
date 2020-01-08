const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: String,
  state: String,
  country: String
});

schema.virtual('address')
  .get(function() { return `${this.city}, ${this.state}, ${this.country}; `; })
  .set(function(v) {
    var a = v.split(', ');
    const city = String(a.slice(0, 1));
    const state = String(a.slice(1, 2));
    const country = String(a.slice(2));
    this.set({ city, state, country });
  });

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio'
});

schema.pre('find', function() {
  this.populate('films');
});

module.exports = mongoose.model('Studio', schema);
