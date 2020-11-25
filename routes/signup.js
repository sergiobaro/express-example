const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');

router.get('/signup', async (req, res) => {
    res.render('users/signup', {
        title: 'Sign Up'
    });
});

module.exports = router;