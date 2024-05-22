const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3005;

const rarityRoadModel = require("./models/carinfo.js");
const { usersModel } = require("./models/users.js");
const router = require("./routes.js");
const secret = process.env.TOKEN_SECRET;

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
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



// define the ping route with the response in JSON
app.get('/ping', (req,res)=>{
  res.json({
    message: 'pong'
  });
});



// Routes
app.use("/crud", router);

app.get('/carsname', (req, res) => {
  rarityRoadModel.find()
    .then(carsinfo => res.json(carsinfo))
    .catch(err => res.json(err));
});

app.post('/postUserData', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await usersModel.create({ username, email, password });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/getUserData', async (req, res) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/deleteUsers/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await usersModel.findByIdAndDelete(userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/updateUsers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const { username, email, password } = req.body;
    const updatedUser = await usersModel.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route with JWT
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1h' });

    // Set the JWT token as a cookie
    res.cookie('jwt', token, { httpOnly: true });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    req.email = decoded.email;
    next();
  });
};

// Example protected route
app.get('/protected-route', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed', email: req.email });
});


if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;

