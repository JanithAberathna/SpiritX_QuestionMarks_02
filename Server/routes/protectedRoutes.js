const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { requireAuth, requireAdmin } = require('../controllers/authMiddleware'); // Updated path to match your folder structure

// Route that requires any authenticated user
router.get('/profile', requireAuth, (req, res) => {
  // req.user contains user info from JWT token
  res.json({
    message: 'Access granted to user profile',
    user: {
      userId: req.user.userId,
      username: req.user.username
    }
  });
});

// Route that requires admin privileges
router.get('/admin', requireAdmin, (req, res) => {
  res.json({
    message: 'Access granted to admin dashboard',
    adminUser: {
      userId: req.user.userId,
      username: req.user.username
    }
  });
});

// Admin route to get all users
router.get('/users', requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

module.exports = router;