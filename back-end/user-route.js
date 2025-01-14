const express = require("express");
const router_user = express.Router();
const userController = require("./user-controller");

// Render the User Settings Page
router_user.get("/user-settings", (req, res) => {
  if (!req.session.user_id) {
    return res.redirect("/sign-in");
  }
  res.render("user-settings", { userId: req.session.user_id });
});

// Handle Form Submissions
router_user.post("/edit", userController.editUser);

router_user.post("/delete", userController.deleteUser);

module.exports = router_user;
