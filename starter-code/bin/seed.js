const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity');


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
    name: "Nicolas Cage",
    occupation: "Actor...kind of",
    catchPhrase: "NOT THE BEES!!!!"
  },
  {
    name: "Bruce Lee",
    occupation: "Martial Artist",
    catchPhrase: "If you spend too much time thinking about a thing, you’ll never get it done."
  },
  {
    name: "John Mulany",
    occupation: "Comedian",
    catchPhrase: "Why buy the cow?"
  }
]


Celebrity.create(blah)
  .then(() => {
    console.log('it worked')
  })
  .catch(() => {
    console.log('it didnt work')
  })