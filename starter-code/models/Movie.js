const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  stars: { type: Schema.Types.ObjectId, ref: 'Celebrity' }
})

const MovieModel = mongoose.model('Movie', movieSchema);

module.exports = MovieModel;

// title - String
// genre - String
// plot - String