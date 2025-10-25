import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
  

// Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, fullName, password, location, skills } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const user = new User({ fullName, email, password, location, skills });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
});

// Sign In
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error signing in', error: err.message });
  }
});

// Protected profile route
router.get('/profile', authMiddleware, async (req, res) => {
    try {
      const user = await User.findById(req.userId).select('-password -__v');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.json({
        fullName: user.fullName,
        email: user.email,
        location: user.location,
        skills: user.skills,  // array of objects [{primary, description}, ...]
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (err) {
      res.status(500).json({ message: 'Error fetching profile', error: err.message });
    }
  });

export default router;
