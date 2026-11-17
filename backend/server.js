const express = require('express');
const moongose = require('mongoose');
const app = express();
const port = 3000;

app.listen(port, (err) => {
  if (err) return console.log(err); 
    console.log("Server is running on port", port);
});