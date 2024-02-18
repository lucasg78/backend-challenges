const express = require("express");
const app = express();
const PORT = 8080;
const ProductManager = require("./ProductManager");
const products = new ProductManager('./files/products.json');


// ENDPOINTS

// 1. Homepage
// The root endpoint ("/") sends a welcome message

app.get("/", (req, res) => {
    res.send(`<h1 style="color: blue">Welcome</h1>`);
})

// 2. Get all products and products by param length limit
// The "/products" endpoint retrieves a list of products and optionally limits the response based on the "limit" query parameter

app.get("/products", async (req, res) => {
    try {
        let limit = req.query.limit;
        let productList = limit ? (await products.getProducts()).slice(0, limit) : await products.getProducts();
        res.json({ products: productList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. Get product by id
// The "/products/:id" endpoint retrieves a specific product by its ID

app.get("/products/:id", async (req, res) => {
    try {
        let productId = parseInt(req.params.id);
        let product = await products.getProductById(productId);
        res.send(
            `<h3>Product ${product.id}: ${product.title}</h3>
                <ol>
                    <li>Description: ${product.description}</li>
                    <li>Price: ${product.price}</li>
                    <li>Stock: ${product.stock}</li>
                </ol>`);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});