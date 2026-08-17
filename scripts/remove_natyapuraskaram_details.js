const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Event = require('../models/Event');

const removeDetails = async () => {
  try {
    console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const result = await Event.updateOne(
      { title: 'Guru Gopinath Natanagramam Nattyapuraskaram award ceremony ft. Pinarayi Vijayan' },
      { 
        $unset: { date: "" },
        $set: { location: "" }
      }
    );

    console.log('Update result:', result);
    console.log('Event details removed successfully.');
  } catch (err) {
    console.error('Error running update script:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

removeDetails();
