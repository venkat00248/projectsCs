import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { User } from './models/user';

const app = express();
app.use(express.json());

// Set up Passport
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Registration Route
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Login Route
app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET_KEY);
  res.json({ token });
});

// Protected Route
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Protected Route' });
});

// Logout Route
app.post('/logout', (req, res) => {
  // Invalidate JWT token
  res.json({ message: 'Logged out' });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
