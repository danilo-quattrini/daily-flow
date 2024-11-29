//Import the mysql module
const mysql = require('mysql2');
//Import and instance the server module
const server = require('express');
const app = server();

//require the dotenv module
require('dotenv').config();

//Create the connection and pass in the environment variables
const port = process.env.PORT;

//Create a connection object with the user details
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Test if the connection is successful
db.connect((err) => {
    if (err) {
        console.log('Error connecting to Db ⤬');
        return err;
    }
    console.log('Connection established ✔');
});

app.listen(port, () => {
    console.log(`Server open on port http://localhost:${port}`);
});
//Export the connection object so that it can be used in other modules
module.exports = db;