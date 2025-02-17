//Import the necessary modules
const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });

// Create the express app
const app = express();

// Set Pug as the template engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "/views"));

// Middleware to serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from 'public'
app.use("/public", express.static(path.join(__dirname, "public")));
// Serve static files from 'node_modules'
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// Configuration for handle the user session even with browser closed
const MySQLStore = require("express-mysql-session")(session);

//Create a session store to store session data in the database
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Middleware for session
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replaced with a strong secret key inside the .env
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 10 * 60 * 1000, // Session expires after 5 minutes of inactivity
      httpOnly: true,
    },
  }),
);

// Import routes
const authRoutes = require("./back-end/auth-route.js");
const dashRoutes = require("./back-end/dash-route.js");
const userRoutes = require("./back-end/user-route.js");

app.use("/", authRoutes); // Use the routes
app.use("/dashboard", dashRoutes); // Use the routes
app.use("/", userRoutes); // Use the routes

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
