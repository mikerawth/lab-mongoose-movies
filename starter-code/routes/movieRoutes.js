const express = require('express');
const router = express.Router();
const Celebrity = require('../models/Celebrity')
const Movie = require('../models/Movie')

/* GET home page */
router.get('/', (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render('movies/index', { movies: allMovies });
    })
    .catch((err) => {
      next(err)
    })
});

router.get('/new', (req, res, next) => {

  Celebrity.find()
    .then((allCelebrities) => {
      res.render('movies/new', { celebrities: allCelebrities })
    })
    .catch((err) => {
      next(err)
    })



})

router.post('/', (req, res, next) => {
  Movie.create(req.body)
    .then(() => {
      res.redirect('/movies')
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/details/:id', (req, res, next) => {
  Movie.findById(req.params.id).populate('stars')
    .then((selectedMovie) => {
      res.render('movies/details', { movie: selectedMovie });
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/edit/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((selectedMovie) => {
      Celebrity.find()
        .then((allCelebrities) => {
          res.render('movies/edit', { movie: selectedMovie, celebrities: allCelebrities });
        })
        .catch((err) => {
          next(err)
        })
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/update/:id', (req, res, next) => {
  Movie.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.redirect('/movies/details/' + req.params.id);
    })
    .catch((err) => {
      next(err)
    })
})


router.post('/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect('/movies')
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router;
