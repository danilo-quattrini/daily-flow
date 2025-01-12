const moment = require("moment");  // Import the database connection
const db = require('../config/db');

// Get Habit Controller
exports.getHabit = async (req, res) => {
    const userId = req.session.user_id; // Ensure the user is logged in

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'SELECT habit_id AS id, habit_name AS name, start_date AS time, progress FROM habits WHERE user_id = ? ORDER BY created_at DESC';
    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error getting habits');
        }
        res.status(200).json(result);
    });
};

// Add Habit Controller
exports.addHabit = async (req, res) => {
    const {name, frequency, startDate, time, progress} = req.body;
    const userId = req.session.user_id; // Ensure the user is logged in
    const createdAT = moment().format('YYYY-MM-DD HH:mm:ss');
    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'INSERT INTO habits (user_id, habit_name, frequency, start_date, progress, created_at) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [userId, name, frequency, startDate, progress,  createdAT], (err, result) => {
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

// Delete Habit Controller
exports.deleteHabit = async (req, res) => {
    const { habitId } = req.body;
    const userId = req.session.user_id;

    console.log('Delete Habit:', { habitId, userId });

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }
    if (!habitId) {
        return res.status(400).send('Habit ID is required.');
    }

    const sql = 'DELETE FROM habits WHERE habit_id = ? AND user_id = ?';
    db.query(sql, [habitId, userId], (err, result) => {
        if (err) {
            console.error('Delete Error:', err);
            return res.status(500).send('Error deleting habit');
        }
        res.status(200).send(result);
    });
};

// Update Habit Controller
/*
exports.updateHabit = async (req, res) => {
    const habitId = req.params.id; // Retrieve id from params
    const { name, frequency, startDate, progress, time } = req.body;
    const userId = req.session.user_id; // Ensure the user is logged in

    console.log('Update Habit:', { habitId, name, frequency, startDate, progress, time });

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'UPDATE habits SET habit_name = ?, frequency = ?, start_date = ?, progress = ?, time = ? WHERE habit_id = ? AND user_id = ?';
    db.query(sql, [name, frequency, startDate, progress, time, habitId, userId], (err, result) => {
        if (err) {
            console.error('Update Error:', err);
            return res.status(500).send('Error updating habit');
        }

        console.log('Update Result:', result);
        res.status(200).send('Habit updated successfully');
    });
};
*/
