const mongoose = require('mongoose');
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
require('dotenv').config({ path: '../.env' });
const Event = require('../models/Event');

const addEvent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const newEvent = new Event({
      title: "ഓണം വാരാഘോഷത്തിൽ നിശാഗന്ധിയിൽ നടനഗ്രാമം അവതരിപ്പിച്ച കേരള നടനം",
      description: "Kerala Natanam performance by Guru Gopinath Natanagramam at Nishagandhi during the Onam week celebrations.",
      location: "Nishagandhi Auditorium, Thiruvananthapuram",
      imageURL: "/onam_dance.png",
      date: new Date(), 
      isFestival: true
    });

    await newEvent.save();
    console.log('Event added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addEvent();
