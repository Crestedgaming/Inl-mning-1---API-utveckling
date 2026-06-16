const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "eshop"
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected to MySQL");
});

module.exports = connection;