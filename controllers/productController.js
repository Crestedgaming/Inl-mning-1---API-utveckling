const { query } = require("../db");

function getProducts(_, res) {
    query("SELECT * FROM product", (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch products" });
        }

        res.json(result);
    });
}

function getProduct(req, res) {
    query(
        "SELECT * FROM product WHERE product_id = ?",
        [req.params.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch product" });
            }

            if (result.length === 0) {
                return res.status(404).json({ message: "Product not found" });
            }

            res.json(result[0]);
        }
    );
}

function createProduct(req, res) {
    const {
        title,
        description,
        stock,
        price,
        image,
        category_id
    } = req.body;

    const sql = `
        INSERT INTO product
        (title, description, stock, price, image, category_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    query(sql, [title, description, stock, price, image, category_id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to create product" });
        }

        res.status(201).json({
            message: "Product created",
            id: result.insertId
        });
    });
}

function updateProduct(req, res) {
    const {
        title,
        description,
        stock,
        price,
        image,
        category_id
    } = req.body;

    const sql = `
        UPDATE product
        SET title = ?, description = ?, stock = ?, price = ?, image = ?, category_id = ?
        WHERE product_id = ?
    `;

    query(
        sql,
        [title, description, stock, price, image, category_id, req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to update product" });
            }

            res.json({ message: "Product updated" });
        }
    );
}

function deleteProduct(req, res) {
    query(
        "DELETE FROM product WHERE product_id = ?",
        [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Failed to delete product" });
            }

            res.json({ message: "Product deleted" });
        }
    );
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
