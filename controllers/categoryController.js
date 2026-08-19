const { query } = require("../db");

function getCategories(_, res) {
    query("SELECT * FROM category", (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch categories" });
        }

        res.json(result);
    });
}

function getProductsByCategory(req, res) {
    const sql = `
        SELECT *
        FROM product
        WHERE category_id = ?
    `;

    query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch products" });
        }

        res.json(result);
    });
}

function createCategory(req, res) {
    const { category_name } = req.body;
    const sql = `
        INSERT INTO category(category_name)
        VALUES(?)
    `;

    query(sql, [category_name], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to create category" });
        }

        res.status(201).json({
            message: "Category created",
            id: result.insertId
        });
    });
}

function updateCategory(req, res) {
    const { category_name } = req.body;
    const sql = `
        UPDATE category
        SET category_name = ?
        WHERE category_id = ?
    `;

    query(sql, [category_name, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ message: "Failed to update category" });
        }

        res.json({ message: "Category updated" });
    });
}

function deleteCategory(req, res) {
    query(
        "DELETE FROM category WHERE category_id = ?",
        [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to delete category" });
            }

            res.json({ message: "Category deleted" });
        }
    );
}

module.exports = {
    getCategories,
    getProductsByCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
