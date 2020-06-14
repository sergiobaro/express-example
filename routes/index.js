const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// GET Home
router.get('/', async (req, res) => {
  let nav_options = [{ text: 'Login', href: '/login' }]

  if (req.session.userId) {
    const user = await User.findById(req.session.userId).select('-password');
    if (user) {
      nav_options = [
        { text: user.email, href: '/users/current', style: 'link' },
        { text: 'Logout', href: '/logout' }
      ]
    }
  }

  res.render('index', { 
    title: 'Express',
    nav_options: nav_options
  });
});

module.exports = router;
