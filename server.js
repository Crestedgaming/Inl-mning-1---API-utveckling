console.log("SERVER FILE LOADED");
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

app.get("/categories", (_, res) => {

    const sql = "SELECT * FROM category";

    query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});



app.get("/categories/:id/products", (req, res) => {

    const id = req.params.id;

    const sql = `
        SELECT *
        FROM product
        WHERE category_id = ?
    `;

    query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);
    });
});



app.post("/categories", (req, res) => {

    const { name } = req.body;

    const sql = `
        INSERT INTO category(name)
        VALUES(?)
    `;

    query(sql, [name], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(201).json({
            message: "Category created",
            id: result.insertId
        });
    });
});

app.patch("/categories/:id", (req, res) => {

    const id = req.params.id;
    const { name } = req.body;

    const sql = `
        UPDATE category
        SET name = ?
        WHERE category_id = ?
    `;

    query(sql, [name, id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Category updated"
        });
    });
});

app.delete("/categories/:id", (req, res) => {

    const id = req.params.id;

    const sql = `
        DELETE FROM category
        WHERE category_id = ?
    `;

    query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Category deleted"
        });
    });
});

app.get("/test", (req, res) => {
    res.send("Works!");
});

app.get("/hello", (req, res) => {
    res.send("HELLO FROM MY API");
});

console.log("POST route loaded");