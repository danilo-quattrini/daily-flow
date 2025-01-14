//Required to the database for verify if the user is the right one who delete the account
const bcrypt = require("bcrypt");
//Import the database connection
const db = require("../config/db");

// Update user details
exports.editUser = async (req, res) => {
  const userId = req.session.user_id;
  const { name, surname, email } = req.body;

  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }

  const sql =
    "UPDATE app_users SET name = ?, surname = ?, email = ? WHERE user_id = ?";
  db.query(sql, [name, surname, email, userId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error updating user details.");
    }
    res.redirect("/dashboard");
  });
};

// Delete user account
exports.deleteUser = async (req, res) => {
  const userId = req.session.user_id;
  const { password } = req.body;
  // Check if the user is logged in or not
  if (!userId) {
    return res.status(401).send("Unauthorized. Please log in.");
  }
  // Check if the password is provided or not before deleting the account
  const sql = "SELECT password FROM app_users WHERE user_id = ?";
  db.query(sql, [userId], (err, results) => {
    if (err || results.length === 0) {
      console.error(err);
      return res.status(500).send("Error fetching user data.");
    }

    const hashedPassword = results[0].password;
    // Compare the password with the hashed password in the database
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(400).send("Incorrect password.");
      }

      const deleteSql = "DELETE FROM app_users WHERE user_id = ?";
      db.query(deleteSql, [userId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error deleting account.");
        }

        req.session.destroy(() => {
          res.redirect("/signup");
        });
      });

      // Delete all habits associated with the user
      const deleteHabitSql = "DELETE FROM habits WHERE user_id = ?";
      db.query(deleteHabitSql, [userId], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error deleting habit.");
        }
      });
    });
  });
};

exports.userSettingsPage = (req, res) => {
  const userId = req.session.user_id;

  if (!userId) {
    // Redirect to login if the user is not logged in
    return res.redirect("/sign-in");
  }

  // Fetch user details if needed
  const sql = "SELECT name, surname, email FROM app_users WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error loading user settings.");
    }

    if (result.length === 0) {
      return res.status(404).send("User not found.");
    }

    // Render the settings page with user details
    res.render("user-settings", { user: result[0] });
  });
};
