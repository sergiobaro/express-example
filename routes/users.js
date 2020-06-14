const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// GET Current user
router.get('/current', async (req, res) => {
  const userId = req.session.userId

  if (!userId) {
    res.redirect('/login');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    res.redirect('/login');
  }
  
  const nav_options = [
    { text: 'Home', href: '/', style: 'link' },
    { text: 'Logout', href: 'logout'}
  ];
  res.render('users/current', {
    nav_options: nav_options,
    user: {
      email: user.email
    }
  });
});

module.exports = router;