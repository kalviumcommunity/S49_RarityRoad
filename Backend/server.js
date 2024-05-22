const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser'); // middleware for parsing request bodies
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const port = 3005;
const rarityRoadModel = require("./models/carinfo.js");
const  {usersModel, UserSchema  } = require("./models/users.js")

// Import CRUD routes
const router = require("./routes.js");

// Middleware for parsing request bodies
app.use(bodyParser.json());

app.use("/crud",router)

app.use(cors())
app.use(express.json())
app.use(cookieParser());

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



// define the ping route with the response in JSON
app.get('/ping', (req,res)=>{
  res.json({
    message: 'pong'
  });
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
  console.log(req.body,id);
  try {
      const { username, email, password } = req.body; // Extract places from the request body

      const updatedUser = await usersModel.findByIdAndUpdate(
          id,
          req.body , // Add place and experiences to visitedPlaces array using $addToSet
          { new: true }
      );
      res.json(updatedUser);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
app.post("/login", async (req, res) => {
  try {
      // Assuming your login logic involves checking credentials
      const { email, password } = req.body;
      
      // Find the user in the MongoDB database
      const user = await usersModel.findOne({ email, password });

      if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Set a cookie with the cookie
      res.cookie('cookie', email, { httpOnly: true });

      res.json({ message: 'Login successful', user , email });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}


module.exports = app;