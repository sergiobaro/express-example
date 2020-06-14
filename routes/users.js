const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// GET Current user
router.get('/current', authenticate, async (req, res) => {
  const nav_options = [
    { text: 'Home', href: '/', style: 'link' },
    { text: 'Logout', href: '/logout'}
  ];
  res.render('users/current', {
    nav_options: nav_options,
    user: req.user
  });
});

module.exports = router;