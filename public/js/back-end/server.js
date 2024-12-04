// Import the necessary modules
const express = require('express');
const path = require('path'); // Path module to handle relative paths
require('dotenv').config({ path: ('../../../config/.env') });
const db = require('../../../config/db.js');

// Instance the express module
const app = express();

// Set Pug/Jade as the template engine
app.set('view engine', 'pug');

// Set 'views' directory for any template files
app.set('views', path.join(__dirname, '../../../views'));

// Serve static files from 'public'
app.use('/public', express.static(path.join(__dirname, "../../../public"))); // <- this line will us public directory as your static assets
// Serve static files from 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, "../../../node_modules"))); // <- this line will us public directory as your static assets
// Routes
app.get('/', (req, res) => res.redirect('/signup'));
app.get('/signup', (req, res) => res.render('signup'));


// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});