const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");

// @desc    Show Add Page
// @route   GET /sory/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add"); // Render the add view
});

// @desc    Process Add Form
// @route   POST /stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id; // Set the user to the logged in user
    await Story.create(req.body); // Create a new story
    res.redirect("/dashboard"); // Redirect to the dashboard
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

// @desc    Show all stories
// @route   GET /stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user") // Populate the user field with the user document
      .sort({ createdAt: "desc" })
      .lean(); // Find all public stories
    res.render("stories/index", {
      stories,
    }); // Render the index view
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

// @desc    Show single story
// @route   GET /stories/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).populate("user").lean(); // Find the story by id
    if (!story) {
      return res.render("error/404"); // Render the 404 view
    }
    res.render("stories/show", {
      story,
    }); // Render the show view
  } catch (err) {
    console.error(err);
    res.render("error/404"); // Render the error view
  }
});

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const story = await Story.findOne({
      _id: req.params.id,
    }).lean(); // Find the story by id
    if (!story) {
      return res.render("error/404"); // Render the 404 view
    }
    if (story.user != req.user.id) {
      res.redirect("/stories"); // Redirect to the stories page
    } else {
      res.render("stories/edit", {
        story,
      }); // Render the edit view
    }
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

// @desc    Update story
// @route   PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean(); // Find the story by id
    if (!story) {
      return res.render("error/404"); // Render the 404 view
    }
    if (story.user != req.user.id) {
      res.redirect("/stories"); // Redirect to the stories page
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      }); // Update the story
      res.redirect("/dashboard"); // Redirect to the dashboard
    }
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

// @desc    Delete story
// @route   DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Story.remove({ _id: req.params.id }); // Remove the story
    res.redirect("/dashboard"); // Redirect to the dashboard
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

// @desc    User stories
// @route   GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({
      user: req.params.userId,
      status: "public",
    })
      .populate("user") // Populate the user field with the user document
      .lean(); // Find all public stories
    res.render("stories/index", {
      stories,
    }); // Render the index view
  } catch (err) {
    console.error(err);
    res.render("error/500"); // Render the error view
  }
});

module.exports = router;
