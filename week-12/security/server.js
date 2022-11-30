const fs = require("fs");
const http = require("http");
const https = require("https");

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("hello world");
});

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433;

// Call this function after the HTTP server starts listening for requests.
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
}

// Call this function after the HTTPS server starts listening for requests.
function onHttpsStart() {
    console.log("Express https server listening on: " + HTTPS_PORT);
}

// Certificate files are created using OpenSSL
// openssl req -new -x509 -nodes -out server.crt -keyout server.key
const SSL_KEY_FILE = "server.key";
const SSL_CRT_FILE = "server.crt";

// Read in the contents of the HTTPS certificate and key
const https_options = {
    key: fs.readFileSync(__dirname + "/" + SSL_KEY_FILE),
    cert: fs.readFileSync(__dirname + "/" + SSL_CRT_FILE)
};

// Listen on ports HTTP_PORT and HTTPS_PORT.
// The default port is port 80 for HTTP and 443 for HTTPS.
http.createServer(app).listen(HTTP_PORT, onHttpStart);
https.createServer(https_options, app).listen(HTTPS_PORT, onHttpsStart);