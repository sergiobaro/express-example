var express = require('express');
var router = express.Router();

// GET Home
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express',
    nav_options: [
      { text: 'Login', href: '/users/login' }
    ]
  });
});

module.exports = router;
