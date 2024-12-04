const express = require('express');
const router = express.Router();
const authController = require('./auth-controller');

// Route to redirect the root to the signup page
router.get('/', (req, res) => res.redirect('/signup'));

// Route to render the signup form
router.get('/signup', (req, res) => res.render('signup'));

// Route to render the signin form
router.get('/sign-in', (req, res) => res.render('sign-in'));

// Route to handle form submission (POST request)
router.post('/signup', authController.signup);

// Route to handle form submission and check if the user exist inside the db (POST request)
router.post('/signin', authController.signin);

// Export the router
module.exports = router;