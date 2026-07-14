const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Exhibit = require('../models/Exhibit');

const updateExhibitImage = async () => {
  try {
    console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected.');

    const result = await Exhibit.updateOne(
      { title: 'Kerala Natanam Genesis Mural' },
      { imageURL: '/kerala_natanam_genesis.png' }
    );

    console.log('Update result:', result);
    console.log('Image URL updated successfully.');
  } catch (err) {
    console.error('Error running update script:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
};

updateExhibitImage();
