const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.idCounter = 1;
        this.loadProducts().then((data) => {
            this.products = data;
        }).catch((error) => {
            console.error(`Error loading products: ${error.message}`);
        });
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    async saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        await fs.writeFile(this.path, data);
    }

    async addProduct(newProduct) {
        if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.thumbnail || !newProduct.code || !newProduct.stock) {
            console.error("Missing data");
            throw new Error("Missing data");
        }

        let duplicate = this.products.find(product => product.code === code);
        if (duplicate) {
            console.warn(`The code already exists`);
            throw new Error(`The code ${product.code} already exists`);
        }
        if (isNaN(Number(product.code))) {
            console.warn("The code must be a number");
            throw new Error("The code must be a number");
        }

        const product = {
            id: this.idCounter++,
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock
        };

        this.products.push(product);
        await this.saveProducts();
    }

    async getProducts() {
        return this.products;
    }

    async getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`No product found with id ${id}`);
        }
        return product;
    }

    async updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No product found with id ${id}`);
        }

        this.products[index] = { ...this.products[index], ...updatedProduct };
        await this.saveProducts();
    }

    async deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index === -1) {
            throw new Error(`No product found with id ${id}`);
        }

        this.products.splice(index, 1);
        await this.saveProducts();
    }
}

module.exports = ProductManager;
