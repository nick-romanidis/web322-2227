const express = require("express");
const app = express();

app.use(express.static("public"));

// API to get a list of users.
app.get("/api/users", (req, res) => {
    var responseObj = {
        message: "Sending a list of all users.",
        messageHtml: "Sending a list of <b>all</b> users.",
    };

    res.json(responseObj);
});

// API to get a single user.
app.get("/api/users/:userId", (req, res) => {
    var userId = req.params.userId;

    var responseObj = {
        message: "Sending the user with the id " + userId,
        messageHtml: "Sending the <b>user</b> with the id <b>" + userId + "</b>",
        userId: parseInt(req.params.userId)
    };

    res.json(responseObj);
});

// Start listening
const PORT = 8080;

app.listen(PORT,()=>{
    console.log(`Web Server is up and running, port ${PORT}`);    
});