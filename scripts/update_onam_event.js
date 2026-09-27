const mongoose = require('mongoose');
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
require('dotenv').config({ path: '../.env' });
const Event = require('../models/Event');

const updateEvent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const malayalamTitle = "ഓണം വാരാഘോഷത്തിൽ നിശാഗന്ധിയിൽ നടനഗ്രാമം അവതരിപ്പിച്ച കേരള നടനം";
    const englishTitle = "Kerala Natanam Performed by Natanagramam at Nishagandhi During Onam Week Celebrations";
    
    const result = await Event.updateOne(
      { title: malayalamTitle },
      { $set: { title: `${malayalamTitle} | ${englishTitle}` } }
    );
    
    if (result.matchedCount > 0) {
      console.log('Event updated successfully with English translation!');
    } else {
      console.log('Event not found. It might have already been updated.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

updateEvent();
