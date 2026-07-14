const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const { protectAdmin } = require('../middleware/authMiddleware');

// @desc    Submit new inquiry
// @route   POST /api/inquiries
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message, courseInterest } = req.body;

  try {
    const newInquiry = new Inquiry({
      name,
      email,
      phone,
      subject,
      message,
      courseInterest
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully!', data: savedInquiry });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private (Admin)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update inquiry status
// @route   PUT /api/inquiries/:id
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    const { status } = req.body;
    if (status) {
      inquiry.status = status;
    }

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    await Inquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
