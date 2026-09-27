const mongoose = require('mongoose');
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
require('dotenv').config({ path: '../.env' });
const Event = require('../models/Event');

const fixEvent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Find the event we just added
    const currentTitle = "ഓണം വാരാഘോഷത്തിൽ നിശാഗന്ധിയിൽ നടനഗ്രാമം അവതരിപ്പിച്ച കേരള നടനം | Kerala Natanam Performed by Natanagramam at Nishagandhi During Onam Week Celebrations";
    const malayalamTitle = "ഓണം വാരാഘോഷത്തിൽ നിശാഗന്ധിയിൽ നടനഗ്രാമം അവതരിപ്പിച്ച കേരള നടനം";
    
    const result = await Event.updateOne(
      { title: currentTitle },
      { 
        $set: { title: malayalamTitle },
        $unset: { date: "" } 
      }
    );
    
    console.log('Event fixed:', result.modifiedCount);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

fixEvent();
