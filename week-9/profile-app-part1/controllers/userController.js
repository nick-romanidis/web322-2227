const userModel = require("../models/userModel");

const express = require("express");
const router = express.Router();

// (GET) User registration page
router.get("/register", (req, res) => {
    res.render("user/register");
});

// (POST) User registration page
router.post("/register", (req, res) => {

    // TODO: Validate the form information.

    const user = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });

    user.save()
        .then(userSaved => {
            console.log(`User ${userSaved.firstName} has been added to the database.`);
            res.redirect("/");
        })
        .catch(err => {
            console.log(`Error adding user to the database ... ${err}`);
            res.redirect("/");
        });
});

module.exports = router;