const path = require("path");
const exphbs = require("express-handlebars");
const express = require("express");
const { homedir } = require("os");
const app = express();

// Set up Handlebars
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main"
 }));

app.set("view engine", ".hbs");

// Make the "assets" folder public and static.
app.use(express.static(path.join(__dirname, "/assets")));

// Add your routes here
// e.g. app.get() { ... }
app.get("/", (req, res) => {
    var employees = [
        {
            name: "Johnny",
            age: 23,
            occupation: "developer",
            company: "Scotiabank",
            visible: true
        },
        {
            name: "Frank",
            age: 40,
            occupation: "Project Manager",
            company: "RBC",
            visible: false
        },
        {
            name: "Jane",
            age: 33,
            occupation: "Manager",
            company: "RBC",
            visible: true
        }
    ];

    res.render("home", {
        employees  // employees: employees,
    });
});

app.get("/about", (req, res) => {
    res.render("about");
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
app.listen(HTTP_PORT, onHttpStart);