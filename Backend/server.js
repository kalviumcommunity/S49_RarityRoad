const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
require('dotenv').config();
const port = 3005;
const rarityRoadModel = require("./models/carinfo.js");
const usersModel = require("./models/users.js")

// Import CRUD routes
const router = require("./routes.js");

// Middleware for parsing request bodies
app.use(bodyParser.json());

app.use("/crud",router)

app.use(cors())
app.use(express.json())

// Connect to MongoDB
const startDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL)
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


app.get('/carsname',(req,res)=>{
  rarityRoadModel.find()
  .then(carsinfo => res.json(carsinfo))
  .catch(err => res.json(err))
});



app.post('/postUserData', async (req,res) =>{
  let x= req.body
  console.log(x)
    let a =await usersModel.create({
      username: x.username,
      email: x.email,    
      password: x.password
    })
   .then(users => res.json(users))
   .catch(err => res.json(err))
   console.log(a)
 })

app.get('/getUserData',async(req,res) =>{
  let b = await usersModel.find()
  .then(users => res.json(users))
  .catch(err => res.json(err))
  console.log(b)
})

// Start the server
if (require.main === module) {
  app.listen(port, async () => {
    await startDatabase();
    console.log(`Server running on PORT: ${port}`);
  });
}



module.exports = app;