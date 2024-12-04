//Import the necessary modules
const express = require('express');
const path = require('path');
require('dotenv').config({ path: ('./config/.env') });

// Create the express app
const app = express();

// Set Pug as the template engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));

// Middleware to serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from 'public'
app.use('/public', express.static(path.join(__dirname, 'public')));
// Serve static files from 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


// Import routes
const authRoutes = require('./back-end/auth-route.js');
app.use('/', authRoutes);  // Use the routes

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});