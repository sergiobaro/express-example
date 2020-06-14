var express = require('express');
var router = express.Router();
const User = require('../models/user.model');

// GET Home
router.get('/', async (req, res) => {
  var nav_options = [{ text: 'Login', href: '/login' }]
  if (req.session.userId !== undefined) {
    const user = await User.findById(req.session.userId).select('-password');
    if (user !== undefined) {
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
