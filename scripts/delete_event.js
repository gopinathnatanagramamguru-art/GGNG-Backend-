const mongoose = require('mongoose');
const path = require('path');
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (err) {
  console.warn('Failed to set custom DNS servers:', err);
}

require('dotenv').config({ path: path.join(__dirname, '../.env') });
const Event = require('../models/Event');

const deleteEvent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    const result = await Event.deleteMany({ title: /Guru Gopinath National Dance Festival/i });
    console.log(`Deleted ${result.deletedCount} event(s) matching Guru Gopinath National Dance Festival.`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error deleting event:', err);
    process.exit(1);
  }
};

deleteEvent();
