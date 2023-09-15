const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Add this line at the top

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your CORS middleware configuration here
const corsOptions = {
  oorigin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['POST', 'GET'],
  credentials: true, // Enable credentials
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Add OPTIONS route for handling preflight requests
app.options('*', cors(corsOptions)); // Allow preflight requests for all routes

// Define an endpoint for saving client data
app.post('/submit-form', async (req, res) => {
  // Create a new client object based on the request body
  const newClient = new Client(req.body);

  try {
    // Save the new client data to the database
    await newClient.save();
    console.log('Client saved successfully');
    res.status(200).json({ message: 'Client data saved successfully.' });
  } catch (err) {
    console.error('Error saving client:', err);
    res.status(500).json({ error: 'An error occurred while saving the client data.' });
  }
});

// MongoDB connection string with the updated database name
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for your "clients" collection
const clientSchema = new mongoose.Schema({
  username: String,
  mobile: String,
  email: String,
  address: String,
  age: String,
  danceForm: String,
  batch: String,
});

// Create a model based on the schema
const Client = mongoose.model('Client', clientSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the backend server for your form application.');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
