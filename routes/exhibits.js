const express = require('express');
const router = express.Router();
const Exhibit = require('../models/Exhibit');
const { protectAdmin } = require('../middleware/authMiddleware');

// @desc    Get all exhibits
// @route   GET /api/exhibits
// @access  Public
router.get('/', async (req, res) => {
  try {
    const exhibits = await Exhibit.find({}).sort({ floor: 1, title: 1 });
    res.json(exhibits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single exhibit
// @route   GET /api/exhibits/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id);
    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }
    res.json(exhibit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new exhibit
// @route   POST /api/exhibits
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res) => {
  const { title, floor, category, description, imageURL } = req.body;

  try {
    const newExhibit = new Exhibit({
      title,
      floor,
      category,
      description,
      imageURL
    });

    const savedExhibit = await newExhibit.save();
    res.status(201).json(savedExhibit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update exhibit
// @route   PUT /api/exhibits/:id
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id);

    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }

    const { title, floor, category, description, imageURL } = req.body;

    exhibit.title = title !== undefined ? title : exhibit.title;
    exhibit.floor = floor !== undefined ? floor : exhibit.floor;
    exhibit.category = category !== undefined ? category : exhibit.category;
    exhibit.description = description !== undefined ? description : exhibit.description;
    exhibit.imageURL = imageURL !== undefined ? imageURL : exhibit.imageURL;

    const updatedExhibit = await exhibit.save();
    res.json(updatedExhibit);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete exhibit
// @route   DELETE /api/exhibits/:id
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const exhibit = await Exhibit.findById(req.params.id);

    if (!exhibit) {
      return res.status(404).json({ message: 'Exhibit not found' });
    }

    await Exhibit.deleteOne({ _id: req.params.id });
    res.json({ message: 'Exhibit removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
