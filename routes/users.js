const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');


// GET Login
router.get('/login', function(req, res, next) {
  res.render('users/login', { 
    title: 'Login'
  });
});


// POST Login
router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.render('users/login', {
      title: 'Login',
      alert: `User '${req.body.email}' not found`
    });
  }

  const arePasswordEqual = await bcrypt.compare(req.body.password, user.password);
  if (!arePasswordEqual) {
    return res.render('users/login', {
      title: 'Login',
      alert: 'Wrong password'
    });
  }


  res.json(user);
});

module.exports = router;
