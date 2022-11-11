const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const path = require("path");

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

            // Create a unique name for the image, so that it can be stord in the file system.
            let uniqueName = `profile-pic-${userSaved._id}${path.parse(req.files.profilePic.name).ext}`;

            // Copy the image data to a file in the "/assets/profile-pics" folder.
            req.files.profilePic.mv(`assets/profile-pics/${uniqueName}`)
                .then(() => {
                    // Update the document so it includes the unique name.
                    userModel.updateOne({
                        _id: userSaved._id
                    }, {
                        "profilePic": uniqueName
                    })
                        .then(() => {
                            // Success
                            console.log("Updated the profile pic.");
                            res.redirect("/");
                        })
                        .catch(err => {
                            console.log(`Error updating the user's profile picture ... ${err}`);
                            res.redirect("/");
                        });
                })
                .catch(err => {
                    console.log(`Error saving the user's profile picture ... ${err}`);
                    res.redirect("/");
                });
        })
        .catch(err => {
            console.log(`Error adding user to the database ... ${err}`);
            res.redirect("/");
        });
});

// (GET) Route to a registration page
router.get("/login", (req, res) => {
    res.render("user/login");
});

// (POST) Route to a registration page
router.post("/login", (req, res) => {

    // TODO: Validate the form information
    let errors = [];

    // Search MongoDB for the matching document (based on email address).
    userModel.findOne({
        email: req.body.email
    })
        .then(user => {
            // Completed the search.
            if (user) {
                // Found the user document.
                // Compare the password submitted to the password in the document.
                bcrypt.compare(req.body.password, user.password)
                    .then(isMatched => {
                        // Done comparing passwords.

                        if (isMatched) {
                            // Passwords match.

                            // Create a new session and store the user object.
                            req.session.user = user;

                            res.render("user/login", {
                                errors
                            });
                        }
                        else {
                            // Passwords are different.
                            errors.push("Password does not match the database.");
                            console.log(errors[0]);

                            res.render("user/login", {
                                errors
                            });
                        }
                    })
            }
            else {
                // User was not found.
                errors.push("Email was not found in the database.");
                console.log(errors[0]);

                res.render("user/login", {
                    errors
                });
            }
        })
        .catch(err => {
            // Couldn't query the database.
            errors.push("Error finding the user in the database ... " + err);
            console.log(errors[0]);

            res.render("user/login", {
                errors
            });
        });
});

router.get("/logout", (req, res) => {
    // Clear the session from memory.
    req.session.destroy();

    res.redirect("/user/login");
});

module.exports = router;