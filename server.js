require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { json } = require("express");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(json());

app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get("/test", (_, res) => {
    res.send("Works!");
});

app.get("/hello", (_, res) => {
    res.send("HELLO FROM MY API");
});

