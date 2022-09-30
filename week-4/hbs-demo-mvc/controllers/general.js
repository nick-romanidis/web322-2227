const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("general/home");
});

router.get("/about", (req, res) => {
    res.render("general/about");
});

module.exports = router;