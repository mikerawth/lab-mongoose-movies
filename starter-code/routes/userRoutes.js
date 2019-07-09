const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const passport = require('passport');




router.get('/signup', (req, res, next) => {
  res.render('user-views/signup');
});

router.post('/signup', (req, res, next) => {
  const theUsername = req.body.theUsername;
  const thePassword = req.body.thePassword;

  const salt = bcrypt.genSaltSync(12);
  const hashedPassWord = bcrypt.hashSync(thePassword, salt);

  User.create({
    username: theUsername,
    password: hashedPassWord
  })
    .then(() => {
      console.log('yay')
      res.redirect('/')
    })
    .catch((err) => {
      next(err)
    })


});

router.get('/login', (req, res, next) => {
  res.render('user-views/login')
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
  failureFlash: true,
  passReqToCallback: true
}));




router.get('/profile', (req, res, next) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser)
    res.render('user-views/profile', { user: req.session.currentUser })
  } else {
    req.flash('error', 'To view your profile, plase login')
    res.redirect('/login')
  }
})


router.post('/logout', (req, res, next) => {
  req.logout();
  res.redirect("/login");
})



module.exports = router;