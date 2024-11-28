//Import the mysql module
const mysql = require('mysql');
//Create a connection object with the user details
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3raepKnyDz',
    database: ''
});
//Test if the connection is successful
connection.connect((err) => {
    if (err) {
        console.log('Error connecting to Db ⤬');
        return err;
    }
    console.log('Connection established ✔');
});

//Export the connection object so that it can be used in other modules
module.exports = connection;