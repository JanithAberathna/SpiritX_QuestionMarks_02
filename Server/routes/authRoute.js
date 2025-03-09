const express = require('express');
const router = express.Router();
const { test, login, registeruser, registerAdmin } = require('../controllers/authController');

// Test route
router.get('/', test);

// Auth routes
router.post('/login', login);
router.post('/signup', registeruser);
router.post('/signup', registerAdmin);

module.exports = router;