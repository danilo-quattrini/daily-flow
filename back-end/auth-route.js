const express = require("express");
const router = express.Router();
const authController = require("./auth-controller");

// Route to redirect the root to the signin page and check if the user is logged already or not
router.get("/", (req, res) => {
  if (req.session.user_id) {
    return res.redirect("/dashboard");
  } else {
    return res.redirect("/sign-in");
  }
});

// Route to render the signup form
router.get("/signup", (req, res) => res.render("signup"));

// Route to render the signin form
router.get("/sign-in", (req, res) => res.render("sign-in"));

// Route to render the dashboard
router.get("/dashboard", (req, res) => res.render("dashboard"));

// Route to handle form submission (POST request)
router.post("/signup", authController.signup);

// Route to handle form submission and check if the user exist inside the db (POST request)
router.post("/sign-in", authController.signin);

// Route to handle the signout (GET request)
router.get("/logout", authController.logout);

// Export the router
module.exports = router;
