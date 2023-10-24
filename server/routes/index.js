const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');
const passport = require('passport');
const session = require('express-session');
const cacheManager = require('express-session-cache-manager');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res, next) => {
  console.log("Hello world!");
});

// Set up passport middleware
router.use(passport.initialize());
router.use(passport.session());

// Set up passport local strategy
passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async (email, password, done) => {
      // Find user in database using email
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        // return res.status(404).json({ success: false, message: "User not found" });
        return done(null, false, { message: 'User not found' });
      }

      // Compare password with hashed password in database
      // const isMatch = await bcrypt.compare(password, user.password);
      if (password == user.password) {
        return done(null, true, user);
      } else {
        return done(null, false, { message: 'Invalid password' });
      }
    }));

// Set up passport serialization and deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// check the authenticatioin
const requireAuth = (req, res, next) => {
  // Check if the user is authenticated
  if (!req.isAuthenticated) {
    return res.json({ success: false, message: 'Unauthorized' }); // .status(401)
  }
  next();
};

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // check if the user is already exists
  const server_user = await User.findOne({ email });
  if (server_user) {
    return res.json({ success: false, message: 'Email already in use' }); //status(400).
  }

  // save the user
  const user = new User({ firstName, lastName, email, password });
  try {
    await user.save();
    res.json({ success: true, message: 'Registration successful' }); //status(200).
  } catch (error) {
    res.json({ success: false, message: 'Error registering new user. please try again.' });//status(500).
  }
});


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.json({ success: false, message: 'Internal server error' }); //status(500).
    }
    if (!user) {
      return res.json({ success: false, message: info.message }); //status(401).
    }
    // If authentication is successful, you can generate a JWT token here
    // and send it in the response if needed
    res.json({ success: true, message: 'Login successful' });//status(200).
    // Create a session object and save it to the session store
    req.session.user = {
      _id: user._id,
      email: user.email,
      name: user.name
    };
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  // Destroy the session object and clear the session cookie
  req.logout((err) => {
    if (err) {
      return res.json({ success: false, message: 'Logout failed' });
    }
    res.json({ success: true, message: 'Logout successful' });
  });
});

router.get('/api/top-stories', requireAuth, (req, res) => {
  axios.get('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=oKEsQ9AmuPcuJU9tGSbAXVb1VOCDE0xY')
    .then(response => {
      res.send(response.data.results);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;