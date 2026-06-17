const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "mysql-21995d6-jonsson-e9e5.g.aivencloud.com",
    user: "avnadmin",
    password: "AVNS_pwiFHpbGk_BIPyrUzUu",
    database: "api_utveckling",
    port: 28711,
});

connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }

    console.log("Connected to MySQL");
});

module.exports = {
  connection,
  query: (...args) => connection.query(...args)
};