const mongoose = require('mongoose');
const path = require('path');
const dns = require('dns');

// Bypass timing out local ISP DNS resolvers for MongoDB Atlas SRV connection queries
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  console.log('Forced Node.js DNS resolver to public DNS (8.8.8.8, 1.1.1.1).');
} catch (err) {
  console.warn('Failed to set custom DNS servers:', err);
}

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Exhibit = require('../models/Exhibit');
const Course = require('../models/Course');
const Event = require('../models/Event');
const Inquiry = require('../models/Inquiry');

const seedData = async () => {
  try {
    // Connect to database
    console.log('Connecting to MongoDB at:', process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected successfully for seeding.');

    // Clear existing data
    await User.deleteMany({});
    await Exhibit.deleteMany({});
    await Course.deleteMany({});
    await Event.deleteMany({});
    await Inquiry.deleteMany({});
    console.log('Existing collections cleared.');

    // 1. Seed Admin User
    // Password 'admin123' will be automatically hashed by User.js save hook
    const admin = new User({
      username: 'admin',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin user created successfully. Username: admin, Password: admin123');

    // 2. Seed Exhibits
    const exhibits = [
      // Ground Floor
      {
        title: '270 Degree Theatre',
        floor: 1,
        category: 'Digital & Theatre',
        description: 'A high-tech 270 degree theater space showing short documentaries and cultural films about Kerala\'s dance forms.',
        imageURL: '/theater_5d.png'
      },
      {
        title: 'Band Class Room',
        floor: 1,
        category: 'Training Room',
        description: 'Equipped classroom dedicated to orchestral and wind instrument training for young musicians.',
        imageURL: '/band_classroom.jpg'
      },
      {
        title: 'Evolution of Dances- Tribal',
        floor: 1,
        category: 'Mural & Painting',
        description: 'Vivid murals and ceiling paintings depicting the historical evolution of tribal dance forms in Kerala.',
        imageURL: '/evolution_of_dances_tribal.png'
      },
      // First Floor
      {
        title: 'Traditional and Temple Dance in Kerala',
        floor: 2,
        category: 'Sculpture',
        description: 'Stunning lifelike models representing Kathakali, Mohiniyattam, and other traditional temple dance forms of Kerala.',
        imageURL: '/traditional_temple_dance.png'
      },
      {
        title: 'Folk Dances - Kerala',
        floor: 2,
        category: 'Sculpture',
        description: 'An exhibition hall showcasing colorful and detailed models depicting the traditional folk dances of Kerala.',
        imageURL: '/folk_dances_kerala.png'
      },
      {
        title: 'wax gallery',
        floor: 2,
        category: 'Sculpture',
        description: 'Stunning lifelike wax models illustrating classical art poses and key cultural figures.',
        imageURL: '/wax_gallery.png'
      },
      {
        title: 'paintings',
        floor: 2,
        category: 'Mural & Painting',
        description: 'Vibrant paintings depicting mythological stories and characters from traditional dance dramas.',
        imageURL: '/paintings.png'
      },
      {
        title: 'Kalaroopam',
        floor: 2,
        category: 'Fine Arts',
        description: 'Models representing the visual beauty, form, and structural history of temple arts and rituals.',
        imageURL: '/kalaroopam.png'
      }
    ];
    await Exhibit.insertMany(exhibits);
    console.log('Seeded exhibits database with', exhibits.length, 'records.');

    // 3. Seed Courses
    const courses = [
      {
        title: 'Kerala Natanam Certificate Course',
        category: 'Dance',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year (Certificate)',
        fee: 'Initial Fee: Rs. 4,800/- (includes admission, study materials, and 1st month fee) | Monthly: Rs. 1,200/- | Exam Fee: Rs. 1,800/-',
        description: 'Guru Gopinath Natanagramam\'s premier certificate course in Kerala Natanam. This course includes standard training, study materials, and certification from the Department of Culture, Govt. of Kerala.'
      },
      {
        title: 'Integrated Diploma (Kathakali)',
        category: 'Dance',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '2 Years (Diploma)',
        fee: 'Initial Fee: Rs. 6,500/- | Monthly: Rs. 2,000/-',
        description: 'An intensive integrated diploma course focusing on Kathakali. Includes fundamental training in mudras, makeup (vesham), classical literature, and performance grammar.'
      },
      {
        title: 'Kerala Natanam',
        category: 'Dance',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year (Certificate)',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Learn the foundational grammar, body movements, mudras (hand gestures), and expressions of Kerala Natanam, the classical dance form structured by Guru Gopinath. Open to all age groups.'
      },
      {
        title: 'Bharathanatyam',
        category: 'Dance',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year (Certificate)',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Traditional classical Bharathanatyam classes covering basic Adavus, hand gestures, facial expressions (abhinaya), and classical items.'
      },
      {
        title: 'Veena',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Traditional training in playing the Saraswati Veena. Focuses on Carnatic music systems, raga patterns, basic geethams, and classical compositions.'
      },
      {
        title: 'Violin',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Carnatic style violin lessons starting from basic bowing techniques, finger placement, scale practices, to rendering classical ragas and varnams.'
      },
      {
        title: 'Thabla',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '6 Months',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Introduction to rhythm patterns (Taal), hand positions, and solo/accompaniment techniques on the Tabla percussion instrument.'
      },
      {
        title: 'Keyboard',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Electronic keyboard training covering classical notations, scale exercises, chord structures, and basic Western and Eastern song rendering.'
      },
      {
        title: 'Guitar',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Acoustic guitar training including chord progression, scale shapes, fingerpicking, and rhythmic strumming patterns for various genres.'
      },
      {
        title: 'Drums',
        category: 'Instrumental Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '6 Months',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Comprehensive drum kit training covering tempo control, rudiments, snare patterns, fill-ins, and basic rock/folk beats.'
      },
      {
        title: 'Ottanthullal',
        category: 'Dance',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Learn the traditional solo performing art form of Kerala, combining satire, social critique, dance, and music based on Kunchan Nambiar\'s classic works.'
      },
      {
        title: 'Shastriya sangeetham',
        category: 'Vocal Music',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '1 Year',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Classical Carnatic vocal music training covering Swaras, Alankaras, Geethams, and Varnams. Prepares students for stage recitals.'
      },
      {
        title: 'Drawing and Paintings',
        category: 'Other',
        timing: 'Batch 1 (Tue, Wed, Thu 4:30-6 PM) / Batch 2 (Fri 4:40-6 PM, Sat 4-6 PM, Sun 10 AM-12:30 PM)',
        duration: '6 Months',
        fee: 'Children: Rs. 500/mo | Adults: Rs. 600/mo',
        description: 'Creative fine arts classes including sketching, shading, color theory, canvas painting, and an introduction to traditional Kerala mural style painting.'
      }
    ];
    await Course.insertMany(courses);
    console.log('Seeded courses database with', courses.length, 'records.');

    // 4. Seed Events
    const events = [
      {
        title: 'Kerala Natanam Lecture Demonstration & Seminar',
        description: 'A unique interactive seminar conducted by senior disciples of Guru Gopinath. They will break down the structural elements of Kerala Natanam, detailing how it bridges traditional Kathakali with modern theatrical presentation.',
        isFestival: false,
        imageURL: '/Lecture%20NG.jpeg'
      }
    ];
    await Event.insertMany(events);
    console.log('Seeded events database with', events.length, 'records.');

    // 5. Seed Inquiries
    const inquiries = [
      {
        name: 'Suresh Kumar',
        email: 'suresh.k@gmail.com',
        phone: '9847012345',
        subject: 'Kerala Natanam Certificate Class Query',
        message: 'Hello, I want to enroll my 10-year-old daughter in the weekend Kerala Natanam batch. Are there seats available in the batch starting this month? Kindly advise on the application process.',
        courseInterest: 'Kerala Natanam (Certificate Course)',
        status: 'Pending'
      },
      {
        name: 'Dr. Lekshmi Nair',
        email: 'lekshminair@uok.edu',
        phone: '9447123456',
        subject: 'Museum Visit for Research Students',
        message: 'Dear Registrar, I would like to bring a group of 15 cultural research scholars from Kerala University to visit the Guru Gopinath Dance Museum on the First Floor. Do we need pre-authorization or a guided slot? Thank you.',
        courseInterest: '',
        status: 'Read'
      }
    ];
    await Inquiry.insertMany(inquiries);
    console.log('Seeded inquiries database with', inquiries.length, 'records.');

    console.log('Database seeding process completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
