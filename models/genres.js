const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },

  description: { type: String },

  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie'
  }],

  popular: { type: Boolean, default: false }  

});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;
