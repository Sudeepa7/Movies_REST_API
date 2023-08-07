const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Import your models here
const Actor = require('./models/actors');
const Country = require('./models/countries');
const Genre = require('./models/genres');
const Movie = require('./models/movies');

// Define your routes here
const actorRoutes = require('./routes/actor');
const countryRoutes = require('./routes/country');
const genreRoutes = require('./routes/genre');
const movieRoutes = require('./routes/movie');

// Use the routes
app.use('/api/actors', actorRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/movies', movieRoutes);

// Connect to your MongoDB Atlas cluster
const dbURI = 'mongodb+srv://MovieApp2:MovieApp2@cluster0.ttwkerx.mongodb.net/MovieApp2?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch((error) => console.log(error));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
