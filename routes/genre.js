const express = require('express');
const router = express.Router();
const Genre = require('../models/genres');

// POST a new genre
router.post('/', async (req, res) => {
  try {
    const genre = new Genre(req.body);
    await genre.save();
    res.status(201).send(genre);
  } catch (err) {
    res.status(400).send(`Error creating genre: ${err.message}`);
  }
});

// GET all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).send(genres);
  } catch (err) {
    res.status(500).send(`Error retrieving genres: ${err.message}`);
  }
});

// GET a specific genre by ID
router.get('/:id', async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate('movies');
    if (!genre) {
      return res.status(404).send();
    }
    res.status(200).send(genre);
  } catch (err) {
    res.status(500).send(`Error retrieving genre: ${err.message}`);
  }
});

// UPDATE a genre by ID
router.put('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!genre) {
      return res.status(404).send();
    }
    res.status(200).send(genre);
  } catch (err) {
    res.status(500).send(`Error updating genre: ${err.message}`);
  }
});

// DELETE a genre by ID
router.delete('/:id', async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) {
      return res.status(404).send();
    }
    res.status(200).send(genre);
  } catch (err) {
    res.status(500).send(`Error deleting genre: ${err.message}`);
  }
});

module.exports = router;
