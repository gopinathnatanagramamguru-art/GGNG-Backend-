const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    default: ''
  },
  imageURL: {
    type: String,
    default: ''
  },
  isFestival: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
