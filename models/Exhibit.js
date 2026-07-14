const mongoose = require('mongoose');

const exhibitSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  floor: {
    type: Number,
    required: true,
    enum: [1, 2, 3]
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Exhibit', exhibitSchema);
