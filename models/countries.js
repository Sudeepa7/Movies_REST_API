const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  language: { type: String, required: true },
  currency: String,
  capital: String,
  population: Number,
  flagImageUrl: String
});

const Country = mongoose.model('Country', countrySchema);

module.exports = Country;
