const express = require('express');
const router = express.Router();
const Movie = require('../models/movies');

// POST a new movie
router.post('/', async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while creating the movie.' });
  }
});

// GET all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().populate('main_actor genres country');
    res.status(200).send(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching movies.' });
  }
});

// GET a specific movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id).populate('main_actor genres country');
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found.' });
    }
    res.status(200).send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching the movie.' });
  }
});

// UPDATE a movie by ID
router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found.' });
    }
    res.status(200).send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while updating the movie.' });
  }
});

// DELETE a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).send({ error: 'Movie not found.' });
    }
    res.status(200).send(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while deleting the movie.' });
  }
});

module.exports = router;
