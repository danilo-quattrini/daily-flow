//Import the module express
const express = require('express');
//Instance the express module
const app = express();

//Import the dotenv module
require('dotenv').config();

//Create a variable to hold the port number
const port = process.env.PORT;

//Start the server with express.
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

//export the app object for being used in other modules
module.exports = app;