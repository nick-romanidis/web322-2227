/*************************************************************************************
* WEB322 - 2227 Project
* I declare that this assignment is my own work in accordance with the Seneca Academic
* Policy. No part of this assignment has been copied manually or electronically from
* any other source (including web sites) or distributed to other students.
*
* Student Name  : Nick Romanidis
* Student ID    : 990000000
* Course/Section: WEB322/NEE
*
**************************************************************************************/

const hellomod = require("./modules/mymodule");

const path = require("path");
const express = require("express");
const app = express();

// Add your routes here
// e.g. app.get() { ... }
app.use(express.static("assets"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/headers", (req, res) => {
    const headers = req.headers;

    res.json(headers);
});

app.get("/name", (req, res) => {
    let helloName = hellomod.sayHello("Nick");
    res.send(helloName);
});

// http://localhost:8080/nameq?personName=Jon
app.get("/nameq", (req, res) => {
    let name = req.query.personName;
    let helloName = hellomod.sayHello(name || "No Name");
    res.send(helloName);
});

// http://localhost:8080/namep/Nick
app.get("/namep/:personName", (req, res) => {
    let name = req.params.personName;
    let helloName = hellomod.sayHello(name || "No Name");
    res.send(helloName);
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