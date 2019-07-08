const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity')

/* GET home page */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render('celebrities', { celebrities: allCelebrities });
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/new', (req, res, next) => {
  res.render('createNewCelebrity')
})

router.post('/', (req, res, next) => {
  Celebrity.create(req.body)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/details/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((selectedCelebrity) => {
      res.render('celebrityDetails', { celebrity: selectedCelebrity });
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((selectedCelebrity) => {
      res.render('celebrityEdit', { celebrity: selectedCelebrity });
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/update/:id', (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/celebrities/details/' + req.params.id);
    })
    .catch((err) => {
      next(err)
    })
})


router.post('/delete/:id', (req, res, next) => {
  Celebrity.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/celebrities')
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
