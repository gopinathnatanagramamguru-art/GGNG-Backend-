const mongoose = require('mongoose');
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
require('dotenv').config({ path: '../.env' });
const Event = require('../models/Event');

const removeTags = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const result = await Event.updateMany(
      { isFestival: true },
      { $set: { isFestival: false } }
    );
    
    console.log('Events updated:', result.modifiedCount);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

removeTags();
