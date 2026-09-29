const mongoose = require('mongoose');
const dns = require('dns');
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
require('dotenv').config({ path: '../.env' });
const Event = require('../models/Event');

const addMissingEvents = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Onam Event
    const onamEvent = new Event({
      title: "ഓണം വാരാഘോഷത്തിൽ നിശാഗന്ധിയിൽ നടനഗ്രാമം അവതരിപ്പിച്ച കേരള നടനം",
      description: "Kerala Natanam performance by Guru Gopinath Natanagramam at Nishagandhi during the Onam week celebrations.",
      location: "Nishagandhi Auditorium, Thiruvananthapuram",
      imageURL: "/onam_dance.png",
      isFestival: false
    });

    // Ganesh Event
    const ganeshEvent = new Event({
      title: "ഗണേശ ചതുർത്ഥി ദിനത്തിൽ തൈക്കാട് സൂര്യ ഗണേശം കളരിയിൽ നടനഗ്രാമം വിദ്യാർത്ഥികൾ അവതരിപ്പിച്ച കേരള നടനം",
      description: "On 14 September 2026, the auspicious day of Ganesh Chathurthi, the students of Guru Gopinath Natanagramam presented a captivating Kerala Natanam performance at Soorya Ganesham Kalari Tycadu",
      location: "Soorya Ganesham Kalari, Tycadu",
      imageURL: "/ganesh_chathurthi.jpg",
      isFestival: false
    });

    await onamEvent.save();
    await ganeshEvent.save();
    
    console.log('Both missing events added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

addMissingEvents();
