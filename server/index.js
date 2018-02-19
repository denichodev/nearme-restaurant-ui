const path = require('path');
const express = require('express');
const cors = require('cors');

const initDB = require('./db');
const sortByRating = require('./utils/sortByRatingDesc');

const app = express();
const DB = initDB();

app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Top restaurant
app.get('/api/v1/top-restaurant', (req, res) => {
  const topRestaurant = sortByRating(DB.food);

  res.json(topRestaurant);
});

// Get restaurant by slug
app.get('/api/v1/restaurants/:slug', (req, res) => {
  const restaurant = DB.food.find(restaurant => restaurant.slug === req.params.slug) || {};

  res.json(restaurant);
});

app.listen(8080, () => {
  console.log('API Server is listening at http://localhost:8080');
});
