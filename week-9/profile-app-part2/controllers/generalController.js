const express = require("express");
const router = express.Router();

// Route to the default home page
router.get("/", (req, res) => {
    res.render("general/home");
});

// Route to the about page
router.get("/about", (req, res) => {
    res.render("general/about");
});

module.exports = router;