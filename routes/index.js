const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const Story = require("../models/Story");

// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" }); // Render the login view
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  // console.log(req.user); // { _id: 5f3f5c8f7e5f3b1f9c8e3b6d, googleId: '106693246588098883000', displayName: 'John Doe', __v: 0}
  try {
    const stories = await Story.find({ user: req.user.id }).lean(); // Find all stories for the logged in user
    res.render("dashboard", {
      name: req.user.firstName,
      stories,
    }); // Render the dashboard view
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

module.exports = router;
