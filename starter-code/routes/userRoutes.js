const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')




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
  if (req.session.errorCount <= 0) {
    req.session.errorMessage = null;
  }
  req.session.errorCount -= 1;
  // you can do this in every single route manually,
  // or you can make your own middleware function and call that function in all routes
  // or you can use flash messages

  res.render('user-views/login', { error: req.session.errorMessage });


});

router.post('/login', (req, res, next) => {
  const inputUsername = req.body.theUsername;
  const inputPassword = req.body.thePassword;
  console.log()

  // req.session.superSecretTerm = inputUsername;

  // res.redirect('/');


  User.findOne({ "username": inputUsername })
    .then(user => {
      if (!user) {
        req.session.errorMessage = "sorry, no one with that username was found";
        req.session.errorCount = 1;
        res.redirect('/login')

        return;
      }
      if (bcrypt.compareSync(inputPassword, user.password)) {
        req.session.currentUser = user;
        res.redirect('/profile')

      } else {
        req.session.errorMessage = "wrong password";
        req.session.errorCount = 1;
        res.redirect('/login')

      }
    })
    .catch(error => {
      next(error);
    })
})



router.get('/profile', (req, res, next) => {
  if (req.session.currentUser) {
    console.log(req.session.currentUser)
    res.render('user-views/profile', { user: req.session.currentUser })
  } else {
    req.session.errorCount = 1;
    req.session.errorMessage = "Sorry, you must be logged in to use that feature"
    res.redirect('/login')
  }
})


router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
})



module.exports = router;