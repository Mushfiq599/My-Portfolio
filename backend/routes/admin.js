const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get admin profile
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findOne({});
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update admin profile
router.put('/profile/:id', async (req, res) => {
  try {
    const { name, bio, title, avatar, resume, social } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, bio, title, avatar, resume, social },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
