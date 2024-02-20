const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require("mongodb");
require("dotenv").config();

app.use(express.json());

// MongoDB connection URL
const uri = process.env.mongoURi;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  try {
    // Connect to the MongoDB database
    await client.connect();

    // Check if the connection is successful
    if (client.topology.isConnected()) {
      res.json({ message: "pong", database_status: "Connected" });
      console.log("yes");
    } else {
      res.json({ message: "pong", database_status: "Disconnected" });
      console.log("no");
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// define the ping route
app.get('/ping',(req,res)=>{
  res.send('pong');
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}

module.exports = app;