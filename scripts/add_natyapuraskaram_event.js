const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Event = require('../models/Event');

const addEvent = async () => {
  try {
    console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const newEvent = new Event({
      title: 'Guru Gopinath Natanagramam Nattyapuraskaram award ceremony by Pinarayi Vijayan',
      description: 'The prestigious Guru Gopinath National Natyapuraskar Award Ceremony presented by the Honorable Chief Minister of Kerala, Shri Pinarayi Vijayan, honoring outstanding classical dance legends and cultural luminaries.',
      date: new Date('2025-06-20T18:30:00.000Z'),
      location: 'Chilamboli Open Air Auditorium, Natanagramam',
      imageURL: '/natyapuraskaram.jpg',
      isFestival: true
    });

    const savedEvent = await newEvent.save();
    console.log('Saved Event:', savedEvent);
    console.log('Event added successfully.');
  } catch (err) {
    console.error('Error running add event script:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

addEvent();
