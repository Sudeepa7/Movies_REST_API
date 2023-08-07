const express = require('express');
const router = express.Router();
const Country = require('../models/countries');

// POST a new country
router.post('/', async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    res.status(201).send(country);
  } catch (err) {
    res.status(400).send({ error: `Error creating country: ${err.message}` });
  }
});

// GET all countries
router.get('/', async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).send(countries);
  } catch (err) {
    res.status(500).send({ error: `Error fetching countries: ${err.message}` });
  }
});

// GET a specific country by ID
router.get('/:id', async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) {
      return res.status(404).send();
    }
    res.status(200).send(country);
  } catch (err) {
    res.status(500).send({ error: `Error fetching country: ${err.message}` });
  }
});

// UPDATE a country by ID
router.put('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!country) {
      return res.status(404).send();
    }
    res.status(200).send(country);
  } catch (err) {
    res.status(500).send({ error: `Error updating country: ${err.message}` });
  }
});

// DELETE a country by ID
router.delete('/:id', async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) {
      return res.status(404).send();
    }
    res.status(200).send(country);
  } catch (err) {
    res.status(500).send({ error: `Error deleting country: ${err.message}` });
  }
});

module.exports = router;
