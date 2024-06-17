const express = require("express");
const router = express.Router();

// @desc    Login/Landing page
// @route   GET /
router.get("/", (req, res) => {
  res.render("login",{ layout: 'login'}); // Render the login view
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", (req, res) => {
  res.render("dashboard"); // Render the dashboard view
});

module.exports = router;