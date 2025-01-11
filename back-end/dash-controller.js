const moment = require("moment");  // Import the database connection
const db = require('../config/db');
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
    const userId = req.session.user_id; // Ensure the user is logged in

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'DELETE FROM habits WHERE habit_id = ? AND user_id = ?';
    db.query(sql, [habitId, userId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error deleting habit');
        }

        res.status(200).send('Habit deleted successfully');
    });
};

// Update Habit Controller
exports.updateHabit = async (req, res) => {
    const { habitId, progress } = req.body;
    const userId = req.session.user_id; // Ensure the user is logged in

    if (!userId) {
        return res.status(401).send('Unauthorized. Please log in.');
    }

    const sql = 'UPDATE habits SET progress = ? WHERE habit_id = ? AND user_id = ?';
    db.query(sql, [progress, habitId, userId], (err, res) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error updating habit');
        }

        res.status(200).send('Habit updated successfully');
    });
};

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