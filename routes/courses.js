const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protectAdmin } = require('../middleware/authMiddleware');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({});
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new course
// @route   POST /api/courses
// @access  Private (Admin)
router.post('/', protectAdmin, async (req, res) => {
  const { title, category, timing, duration, fee, description } = req.body;

  try {
    const newCourse = new Course({
      title,
      category,
      timing,
      duration,
      fee,
      description
    });

    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update course
// @route   PUT /api/courses/:id
// @access  Private (Admin)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const { title, category, timing, duration, fee, description } = req.body;

    course.title = title !== undefined ? title : course.title;
    course.category = category !== undefined ? category : course.category;
    course.timing = timing !== undefined ? timing : course.timing;
    course.duration = duration !== undefined ? duration : course.duration;
    course.fee = fee !== undefined ? fee : course.fee;
    course.description = description !== undefined ? description : course.description;

    const updatedCourse = await course.save();
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete course
// @route   DELETE /api/courses/:id
// @access  Private (Admin)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    await Course.deleteOne({ _id: req.params.id });
    res.json({ message: 'Course removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
