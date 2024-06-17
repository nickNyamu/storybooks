const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login",{ layout: 'login'}); // Render the login view
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
  // console.log(req.user); // { _id: 5f3f5c8f7e5f3b1f9c8e3b6d, googleId: '106693246588098883000', displayName: 'John Doe', __v: 0}
  res.render("dashboard", {
    name: req.user.firstName,
  
  }); // Render the dashboard view
});

module.exports = router;