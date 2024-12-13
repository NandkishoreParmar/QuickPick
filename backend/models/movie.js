const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  watched: { type: Boolean, default: false }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
