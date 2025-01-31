const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisines: [String],
  city: String,
  restaurant_id: String
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
