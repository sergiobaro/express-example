var express = require('express');
var router = express.Router();

// GET Login
router.get('/login', function(req, res, next) {
  res.render('users/login', { 
    title: 'Login'
  });
});


// POST Login
router.post('/login', function(req, res) {
  res.json(req.body);
  // res.render('users/login', {
  //   title: 'Login',
  //   alert: req.body.email || "empty"
  // });
});

module.exports = router;
