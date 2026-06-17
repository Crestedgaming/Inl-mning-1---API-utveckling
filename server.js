const express = require("express");
const cors = require("cors");
const { json } = require("express");
const { query } = require("./db");

const app = express();

app.use(cors());
app.use(json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/categories", (req, res) => {

    const sql = "SELECT * FROM category";

    query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});