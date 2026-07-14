const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protectAdmin } = require('../middleware/authMiddleware');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res) => {
  const { title, date, description, location, imageURL, isFestival } = req.body;

  try {
    const newEvent = new Event({
      title,
      date,
      description,
      location,
      imageURL,
      isFestival
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const { title, date, description, location, imageURL, isFestival } = req.body;

    event.title = title !== undefined ? title : event.title;
    event.date = date !== undefined ? date : event.date;
    event.description = description !== undefined ? description : event.description;
    event.location = location !== undefined ? location : event.location;
    event.imageURL = imageURL !== undefined ? imageURL : event.imageURL;
    event.isFestival = isFestival !== undefined ? isFestival : event.isFestival;

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await Event.deleteOne({ _id: req.params.id });
    res.json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
