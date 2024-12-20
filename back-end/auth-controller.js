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

    try {
        // Query the database for the user by email
        db.query('SELECT * FROM app_users WHERE email = ?', [email], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (results.length === 0) {
                // User does not exist
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the password with the hashed password in the database
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Server error' });
                }

                if (!isMatch) {
                    // Password does not match
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
                console.log('User signed in');
                // User exists and password is correct
                return res.status(200).json({ message: 'Sign-in successful' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}