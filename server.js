const express = require('express');
<<<<<<< HEAD
const app =  express();
const PORT = process.env.PORT || 3000;

app.get('/ping',(req,res)=>{
    res.send('/Pong!')
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
=======
const app = express();
const port = process.env.PUBLIC_PORT || 3000;

// define the ping route with the response in JSON
app.get('/ping', (req,res)=>{
  res.json({
    message: 'pong'
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
}


module.exports = app;
>>>>>>> 40d1784cb2db4e6fad28fb85331be821d3de460e
