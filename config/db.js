//Import the mysql module
const mysql = require('mysql2');

//Import the dotenv module
require('dotenv').config();
//Create a connection object with the user details
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

//Test if the connection is successful
const connectionToDB = function testConnection(){
    db.connect((err) => {
        if (err) {
            console.log('Error connecting to db ⤬', err);
            return err;
        }
        console.log('Connection to db established ✔');
    });
}


//Export the connection object so that it can be used in other modules
module.exports = db;