var express = require('express');
var router = express.Router();

// GET Home
router.get('/', function(req, res) {
  var nav_options = []
  if (req.session.userId === undefined) {
    nav_options.push({ text: 'Login', href: 'users/login' })
  } else {
    nav_options.push({ text: 'Logout', href: 'users/logout' })
  }

  res.render('index', { 
    title: 'Express',
    nav_options: nav_options
  });
});

module.exports = router;
