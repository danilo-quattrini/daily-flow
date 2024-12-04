// Initiate connection to the server
const app = require('../../../config/server.js');

// Import the function to read data from the html form
const bodyParser = require('body-parser');

// Use the body-parser to read data from the html form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import the module te encrypt the password
const bcrypt = require('bcrypt');
