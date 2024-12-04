const bcrypt = require('bcrypt');
const db = require('../config/db');  // Import the database connection

// Signup Controller
exports.signup = (req, res) => {
    const { name, surname, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error encrypting password');
        }

        // Insert the user into the database
        const sql = 'INSERT INTO app_users (name, surname, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, surname, email, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error inserting data into the database');
            }

            // Redirect to the signin page after successful signup
            res.redirect('/sign-in');
            console.log('User signed up and added to the database');
        });
    });
};

// Signin Controller
exports.signin = (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    const sql = 'SELECT * FROM app_users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error retrieving data from the database');
        }

        // Check if the user exists
        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        // Check if the password is correct
        bcrypt.compare(password, results[0].password, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error comparing passwords');
            }

            if (!result) {
                return res.status(401).send('Incorrect password');
            }

            // Redirect to the dashboard after successful signin
            //res.redirect('/dashboard');
            console.log('User signed in');
        });
    });
}