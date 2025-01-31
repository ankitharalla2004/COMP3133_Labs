const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const app = express();
const mongouri = "mongodb+srv://rallaankitha2004:CYzMeJKeREgYxqG6@cluster0.36tqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Connect to MongoDB
mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
// Route to get restaurants by cuisine
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
      const cuisine = req.params.cuisine;
      const restaurants = await Restaurant.find({ cuisines: cuisine });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  // Route to get sorted restaurants
app.get('/restaurants', async (req, res) => {
    try {
      const sortBy = req.query.sortBy === 'ASC' ? 1 : -1;
      const restaurants = await Restaurant.find().sort({ restaurant_id: sortBy });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
      const restaurants = await Restaurant.find({
        cuisines: 'Delicatessen',
        city: { $ne: 'Brooklyn' }
      }, 'cuisines name city').sort({ name: 1 });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  
