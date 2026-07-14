const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Dance', 'Vocal Music', 'Instrumental Music', 'Other'],
    default: 'Dance'
  },
  timing: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  fee: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
