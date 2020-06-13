var express = require('express');
var router = express.Router();

// GET Login
router.get('/login', function(req, res, next) {
  res.render('users/login', { 
    title: 'Login',
    nav_options: [
      { text: 'Back', href: '/', btnStyle: 'link' }
    ]
  });
});

module.exports = router;
