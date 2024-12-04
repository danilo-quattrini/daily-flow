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
            res.redirect('/signin');
        });
    });
};