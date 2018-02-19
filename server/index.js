const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const initDB = require('./db');
const sortByRating = require('./utils/sortByRatingDesc');

const app = express();
const DB = initDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Top restaurant
app.get('/api/v1/top-restaurant', (req, res) => {
  const topRestaurant = sortByRating(DB.food);

  res.json(topRestaurant);
});

// Near restaurant
app.get('/api/v1/near-restaurant', (req, res) => {
  const topRestaurant = DB.food;

  res.json(topRestaurant);
});

// Get restaurant by slug
app.get('/api/v1/restaurants/:slug', (req, res) => {
  const restaurant =
    DB.food.find(restaurant => restaurant.slug === req.params.slug) || {};

  res.json(restaurant);
});

// Create a reservation
app.post('/api/v1/reservation', (req, res) => {
  res.send({
    id: 1,
    userId: req.body.userId,
    restaurantId: req.body.restaurantId,
    checkIn: req.body.checkIn,
    guest: req.body.guest,
  });
});

app.listen(8080, () => {
  console.log('API Server is listening at http://localhost:8080');
});
