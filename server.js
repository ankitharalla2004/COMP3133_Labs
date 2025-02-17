const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); 


mongoose.connect('mongodb+srv://rallaankitha2004:CYzMeJKeREgYxqG6@cluster0.36tqu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/  
  },
  city: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/  
  },
  website: {
    type: String,
    required: true,
    match: /^https?:\/\/[^\s]+$/  
  },
  zipCode: {
    type: String,
    required: true,
    match: /^\d{5}-\d{4}$/  
  },
  phone: {
    type: String,
    required: true,
    match: /^\d{1}-\d{3}-\d{3}-\d{4}$/  
  }
});


const User = mongoose.model('User', userSchema);


app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.listen(8081, () => {
  console.log('Server running on http://localhost:8081');
});
