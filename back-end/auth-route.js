const express = require('express');
const router = express.Router();
const authController = require('./auth-controller');

// Route to redirect the root to the signup page
router.get('/', (req, res) => res.redirect('/signup'));

// Route to render the signup form
router.get('/signup', (req, res) => res.render('signup'));

// Route to render the signin form
router.get('/sign-in', (req, res) => res.render('sign-in'));

// Route to render the dashboard
router.get('/dashboard', (req, res) => res.render('dashboard'));

// Route to handle form submission (POST request)
router.post('/signup', authController.signup);

// Route to handle form submission and check if the user exist inside the db (POST request)
router.post('/sign-in', authController.signin);

// Route to handle the signout (GET request)
router.get('/logout', authController.logout);

// Route to handle the add habit (POST request)
router.post('/add-habit', authController.addHabit);
// Export the router
module.exports = router;