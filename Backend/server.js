const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
require('dotenv').config();
const port = process.env.PUBLIC_PORT || 3000;

// Import CRUD routes
const router = require("./routes.js");

// Middleware for parsing request bodies
app.use(bodyParser.json());

app.use("/crud",router)

// Connect to MongoDB
const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL)
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

// Disconnect from MongoDB
const stopDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
};

// Check MongoDB connection status
const isConnected = () => {
  return mongoose.connection.readyState === 1;
};

// Ping route to check server status
app.get('/ping', (req, res) => {
  res.json({
    message: 'Server is running',
    database: isConnected() ? 'connected' : 'disconnected',
  });
});

// Handle shutdown signals
process.on('SIGINT', async () => {
  await stopDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await stopDatabase();
  process.exit(0);
});

// Start the server
if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`Server running on PORT: ${port}`);
  });
}

module.exports = app;