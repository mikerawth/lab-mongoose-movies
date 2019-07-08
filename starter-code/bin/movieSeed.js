const mongoose = require('mongoose');
const Movie = require('../models/Movie');


mongoose
  .connect('mongodb://localhost/lab-mongoose-movies', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const blah = [
  {
    title: "Derek Zoolander",
    genre: "Comedy",
    plot: "Supermodel Derek Zoolander is becoming overshadowed by rival Hansel, and struggles to find meaning in his life"
  },
  {
    title: "Intersteller",
    genre: "Thriller",
    plot: "Former astronaut pilot lives on a dying world, until he gets a message from space to save humanity"
  },
  {
    title: "Kung Pow, Enter The Fist",
    genre: "Action/Comedy",
    plot: "Dumb and fun kung fu fighting movie, purposely bad in a funny way"
  }
]


Movie.create(blah)
  .then(() => {
    console.log('it worked')
  })
  .catch(() => {
    console.log('it didnt work')
  })