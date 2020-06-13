const express = require('express');
const router = express.Router();
const User = require('../models/user.model')


// GET Login
router.get('/login', function(req, res, next) {
  res.render('users/login', { 
    title: 'Login'
  });
});


// POST Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select('-password');
  if (!user) {
    return res.render('users/login', {
      title: 'Login',
      alert: `User '${req.body.email}' not found`
    });
  }

  res.json(user);
});

module.exports = router;
