const bcrypt = require('bcrypt');
const db = require('../config/db');  // Import the database connection

// Signup Controller
exports.signup = async (req, res) => {
    const { name, surname, email, password } = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error encrypting password');
        }

        // Insert the user into the database
        const sql = 'INSERT INTO app_users (name, surname, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, surname, email, hash], (err, res) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email already exists');
                }
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
exports.signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Query the database for the user by email
        const sql = 'SELECT * FROM app_users WHERE email = ?';
        db.query(sql, [email], async (err, results) => {

            // Database error
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Server error' });
            }

            // User does not exist
            if (results.length === 0) return res.status(404).json({ message: 'User not found' });

            // Compare the password with the hashed password in the database
            const user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Server error' });
                }

                // Password does not match
                if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

                req.session.user_id = user.user_id;
                console.log(`User signed in: ${user.user_id}`);
                // User exists and password is correct
                return res.status(200).json({ message: 'Sign-in successful', userId: user.user_id  });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
        console.log('User signed out');
        return res.redirect('/sign-in');
    });
};

// Add Habit Controller
exports.addHabit = async (req, res) => {
    const {name, frequency, startDate, time, progress} = req.body;
    const userId = req.session.user_id; // Ensure the user is logged in

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'INSERT INTO habits (habit_name, frequency, start_date, progress, user_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [name, frequency, startDate, progress, userId, time], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error adding habit');
        }

        const newHabit = {
            id: result.insertId,
            name,
            frequency,
            startDate,
            progress,
            time,
        };

        res.status(201).json(newHabit); // Return the newly created habit
    });
};