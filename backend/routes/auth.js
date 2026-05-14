const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, phone, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User with this email already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ fullName, phone, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ 
      token: generateToken(user._id),
      message: 'User registered successfully' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login with Email
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    res.json({ 
      token: generateToken(user._id),
      message: 'Login successful' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Login with OTP (Simulated)
router.post('/login-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(400).json({ message: 'No user found with this phone number' });

    res.json({ 
      token: generateToken(user._id),
      message: 'OTP Login successful' 
    });
  } catch (error) {
    console.error('OTP Login error:', error);
    res.status(500).json({ message: 'Server error during OTP login' });
  }
});

module.exports = router;
