const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const sequelizeModule = require("sequelize");

const app = express();

// Set up Handlebars.
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: ''
}));

app.set("view engine", ".hbs");

// Set up body-parser
app.use(express.urlencoded({ extended: true }));

// Define the connection to our Postgres instance 
const sequelize = new sequelizeModule("vinjpiuy", "vinjpiuy", "n-QVUHZjKYfL3HWvqYzNIfiJYp5X9Z9V", {
    host: "peanut.db.elephantsql.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});

// Define a model for the "Name" tables
const nameModel = sequelize.define("Name", {
    fName: sequelizeModule.STRING, // First name
    lName: sequelizeModule.STRING  // Last name
});

// Define our default route
app.get("/", (req, res) => {
    nameModel.findAll({
        order: ["fName"]
    }).then(data => {
        // Pull the data (exclusively)
        // This is to ensure that our "data" object contains the returned data (only) and nothing else.
        const names = data.map(value => value.dataValues);

        res.render("viewTable", {
            names
        });
    });
});

// Define a route to add a new name
app.post("/addName", (req, res) => {
    // Create a record using the "name" model and the data from req.body.
    nameModel.create({
        fName: req.body.fName,
        lName: req.body.lName
    }).then(() => {
        console.log("Successfully create a new name record.");
        res.redirect("/");
    });
});

// Define a route to update/delete a name.
app.post("/updateName", (req, res) => {
    // Check to see if both the first and last name are blank (empty).
    if (req.body.fName.length === 0 && req.body.lName.length === 0) {
        // Delete the record from the database.
        nameModel.destroy({
            where: { id: req.body.id }
        }).then(() => {
            console.log("Successfully deleted the name for id #" + req.body.id);
            res.redirect("/");
        });
    }
    else {
        // Update the record in the database with new info from req.body
        nameModel.update({
            fName: req.body.fName,
            lName: req.body.lName
        }, {
            where: { id: req.body.id }
        }).then(() => {
            console.log("Successfully updated the name for id #" + req.body.id);
            res.redirect("/");
        });
    }
});

// *** DO NOT MODIFY THE LINES BELOW ***

// This use() will not allow requests to go beyond it
// so we place it at the end of the file, after the other routes.
// This function will catch all other requests that don't match
// any other route handlers declared before it.
// This means we can use it as a sort of 'catch all' when no route match is found.
// We use this function to handle 404 requests to pages that are not found.
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send("Something broke!")
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
sequelize.sync()
    .then(() => {
        app.listen(HTTP_PORT, onHttpStart);
    });
