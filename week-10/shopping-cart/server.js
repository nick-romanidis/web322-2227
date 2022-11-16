const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const e = require("express");

const app = express();

// Set up Handlebars.
app.engine('.hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: false
}));

app.set("view engine", ".hbs");

// Set up express-session
app.use(session({
    secret: "this_is_a_secret",
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    // res.locals.user is a global handlebars variable.
    // This means that every single handlebars file can access this variable.
    res.locals.user = req.session.user;
    next();
});


// Set up a faux song database.
const songs = [
    {
        id: 1,
        name: "Life Goes On",
        artist: "BTS",
        price: 0.99
    },
    {
        id: 2,
        name: "Mood",
        artist: "24kGoldn Featuring Ian Dior",
        price: 0.50
    },
    {
        id: 3,
        name: "Positions",
        artist: "Ariana Grande",
        price: 0.99
    }
];

// Find a song from the faux database.
const findSong = function (id) {
    return songs.find(song => {
        return song.id == id;
    });
}

// Define a function to prepare the view model.
const VIEW_NAME = "musicstore";

const prepareViewModel = function (req, message) {

    if (req.session && req.session.user) {
        // Is the user signed in and has a session been established.

        let cart = req.session.cart || [];
        let cartTotal = 0;

        // Check if the cart has any songs.
        const hasSongs = cart.length > 0;

        // If there are songs in the shopping cart, then calculate the order total.
        if (hasSongs) {
            cart.forEach(cartSong => {
                cartTotal += cartSong.song.price * cartSong.qty;
            });
        }

        return {
            message,
            hasSongs,
            songs: cart,
            cartTotal: "$" + cartTotal.toFixed(2)
        };
    }
    else {
        // The user is not signed in, return default information.
        return {
            message,
            hasSongs: false,
            songs: [],
            cartTotal: "$0.00"
        };
    }
}

// Default home route.
app.get("/", (req, res) => {
    res.render(VIEW_NAME, prepareViewModel(req));
});

// Route to add a new song to the shopping cart.
// The ID of the song will be specified as part of the URL.
app.get("/add-song/:id", (req, res) => {
    let message;
    const songId = req.params.id;

    // Check if the user is signed in first.
    if (req.session.user) {
        // The user is signed in.

        // A shopping cart item will look like this:
        //    id: ID of the song.
        //    qty: Number of purchases for this song.
        //    song: The details about the song (for displaying in cart).

        let song = findSong(songId);
        let cart = req.session.cart = req.session.cart || [];

        if (song) {
            // Song was found in the database.

            // Search the shopping cart to see if the song is already added.
            let found = false;

            cart.forEach(cartSong => {
                if (cartSong.id == songId) {
                    // Song is already in the shopping cart.
                    found = true;
                    cartSong.qty++;
                }
            });

            if (found) {
                message = "The song was already in the cart, incremented the quantity by one."
            }
            else {
                // Song was not found int he shopping cart.
                // Create a new object and add to the cart.
                cart.push({
                    id: songId,
                    qty: 1,
                    song
                });

                // Logic to sort the cart by artist name.
                cart.sort((a, b) => a.song.artist.localeCompare(b.song.artist));

                message = "The song was added to the shopping cart.";
            }
        }
        else {
            // Song was not found in the database.
            message = "The song was not found in the database.";
        }
    }
    else {
        // The user is not signed in.
        message = "You must be logged in.";
    }

    // Render the view.
    res.render(VIEW_NAME, prepareViewModel(req, message));
});

// Route to remove a new song from the shopping cart.
// The ID of the song will be specified as part of the URL.
app.get("/remove-song/:id", (req, res) => {
    let message;
    const songId = req.params.id;

    // Check if the user is signed in first.
    if (req.session.user) {
        // The user is signed in.

        let cart = req.session.cart || [];

        // Find the index of the song in the shopping cart.
        const index = cart.findIndex(cartSong => cartSong.id == songId);

        if (index >= 0) {
            // Song was found in the shopping cart.
            message = `Removed "${cart[index].song.name}" from the cart.`;
            cart.splice(index, 1);
        }
        else {
            // Song was not found in the shopping cart.
            message = "Song was not found in the cart.";
        }
    }
    else {
        // The user is not signed in.
        message = "You must be logged in.";
    }

    // Render the view.
    res.render(VIEW_NAME, prepareViewModel(req, message));
});


// Route to check-out the user.
app.get("/check-out", (req, res) => {
    let message;

    // Check if the user is signed in first.
    if (req.session.user) {
        // The user is signed in.

        let cart = req.session.cart || [];

        if (cart.length > 0) {
            // There are items in the cart.
            message = "Thank you for your purchase, you are now checked out.";

            // Don't want to do this.
            // req.session.destroy();

            req.session.cart = [];
        }
        else {
            // There are no items in the cart.
            message = "You cannot check-out, there are no items in the cart."
        }
    }
    else {
        // The user is not signed in.
        message = "You must be logged in.";
    }

    // Render the view.
    res.render(VIEW_NAME, prepareViewModel(req, message));
});

// Route to logout the user.
app.get("/logout", (req, res) => {
    let message;

    // Check if the user is signed in first.
    if (req.session.user) {
        // The user is signed in.

        message = "You have been logged out.";

        req.session.destroy();

        res.locals.user = undefined;
    }
    else {
        // The user is not signed in.
        message = "You must be logged in.";
    }

    // Render the view.
    res.render(VIEW_NAME, prepareViewModel(req, message));
});


// Route to login user.
app.get("/login", (req, res) => {

    let message;

    if (req.session.user) {
        // User is already logged in.
        message = `${req.session.user.name} is already logged in.`;
    }
    else {
        // Create a new user object and start the session.
        // This is normally pulled from the database and not hard-coded.
        req.session.user = {
            name: "Nick",
            vip: true
        };

        // Update the "user" global variable before rendering the view (because we
        // are not using res.redirect).
        res.locals.user = req.session.user;

        message = `${req.session.user.name} is now logged in.`;
    }

    // Render the view.
    res.render(VIEW_NAME, prepareViewModel(req, message));
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
