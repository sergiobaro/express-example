const User = require('../models/user.model');

const authenticate = async (req, res, next) => {
  const userId = req.session.userId

  if (!userId) {
    console.log("Authenticate: not user id");
    // TODO: add error message
    return res.redirect('/');
  }

  const user = await User.findById(userId).select('-password');
  if (!user) {
    console.log("Authenticate: not user found")
    // TODO: add error message
    return res.redirect('/');
  }

  req.user = user;
  next();
}

module.exports = authenticate;