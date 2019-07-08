const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity')

/* GET home page */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render('celebrities/index', { celebrities: allCelebrities });
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new')
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
      res.render('celebrities/details', { celebrity: selectedCelebrity });
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((selectedCelebrity) => {
      res.render('celebrities/edit', { celebrity: selectedCelebrity });
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
