const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({

  name: { type: String, required: true },

  gender: { type: String, enum: ['male', 'female', 'non-binary'] },

  bio: String,

  dob: Date,

  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country'
  },
  
  movies: [{
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie'
    },
    character: String
  }],

  awards: [{
    name: String,
    year: Number
  }],
  
  occupations : [String],

  photo: String

});

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
