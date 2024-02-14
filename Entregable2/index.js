// Curso: Programación Backend
// Comisión: 53110
// Desafío: Entregable 2
// Alumno: Lucas Gallo
// Fecha: 07/02/2024

const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []; // Inicializo la lista de productos como un arreglo vacío
        this.idCounter = 1; // Inicializo el contador de id
        this.path = path // Recibe la ruta a trabajar desde el momento de generar la instancia
    }

    getProducts() {
        if (fs.existsSync(this.path)) {
            const products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
            return products || [];
        } else {
            console.log("No hay productos guardados. Creando archivo...");
            fs.writeFileSync(this.path, '[]');  // Crea un array vacío en el archivo indicado
            return [];
        }
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        // Realizar validaciones
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("ERROR: faltan completar datos del producto");
            return;
        }
        if (this.products.some(product => product.code === code)) {
            console.error(`ERROR: ya existe un producto con el código ${code}`);
            return;
        }
        // Agregar un nuevo producto a la lista con id autoincrementable
        const product = {
            id: this.idCounter++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        const productsFile = this.getProducts();
        productsFile.push(product);
        fs.writeFileSync(this.path, JSON.stringify(productsFile, null, 4));
        console.log(`Producto agregado: ${title} (id=${product.id})`);
    }

    getProductById(id) {
        // Buscar el producto por id
        const product = this.getProducts().find(p => p.id === id);
        // Mostrar el producto o un mensaje de error si no se encuentra
        if (product) {
            return product;
        } else {
            console.error(`ERROR: producto con id=${id} no encontrado`);
        }
    }

    updateProduct(id, updatedFields) {
        const products = this.getProducts();
        // Encontrar el índice del producto con el id especificado
        const index = products.findIndex(product => product.id === id);
        if (index !== -1) {
            // Conservar el id original y modificar los campos especificados
            products[index] = { ...products[index], ...updatedFields };
            // Escribir en el archivo el array actualizado
            fs.writeFileSync(this.path, JSON.stringify(products, null, 4));
            console.log(`Producto con id=${id} actualizado`);
        } else {
            console.error(`ERROR: producto con id=${id} no encontrado`);
        }
    }

    // deleteProduct - OPCIÓN 1
    /*     deleteProduct(id) {
            const products = this.getProducts();
            // Chequear si el producto con el id indicado existe
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                // Producto encontrado, se procede a eliminarlo
                const newList = products.filter(product => product.id !== id);
                fs.writeFileSync(this.path, JSON.stringify(newList, null, 4));
                console.log(`Producto con id=${id} eliminado`);
            } else {
                console.error(`ERROR: producto con id=${id} no encontrado. No se ha eliminado.`);
            }
        } */

    // deleteProduct - OPCIÓN 2
    deleteProduct(id) {
        const products = this.getProducts();
        // Chequear si el producto con el id indicado existe
        if (products.some(product => product.id === id)) {
            // Producto encontrado, se procede a eliminarlo
            const newList = products.filter(product => product.id !== id);
            fs.writeFileSync(this.path, JSON.stringify(newList, null, 4));
            console.log(`Producto con id=${id} eliminado`);
        } else {
            console.error(`ERROR: producto con id=${id} no encontrado. No se ha eliminado.`);
        }
    }

    deleteFile() {
        setTimeout(() => {
            if (fs.existsSync(this.path)) {
                fs.unlinkSync(this.path)
                console.log("Archivo eliminado...!!!");
            } else {
                console.log("No existe el archivo");
            }
        }, 5000);
    }
}



// Testing

// 1. Creación de la instancia de la clase "ProductManager"
const productManager = new ProductManager('./files/products.json'); // Se pasa el path por parámetro

// 2. Prueba de array vacío
console.log('---------------------------------------------------------');
console.log('Prueba de array vacío:');
console.log(productManager.getProducts());

// 3. Prueba de agregar un producto 
console.log('---------------------------------------------------------');
console.log('Prueba de agregar 1 producto:');
productManager.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
console.log(productManager.getProducts()); // Debe aparecer el producto recién agregado

// 4. Prueba de buscar un producto por id
console.log('---------------------------------------------------------');
console.log('Prueba de producto encontrado por id=1:');
console.log(productManager.getProductById(1)) // Existe
console.log('---------------------------------------------------------');
console.log('Prueba de producto con id=2 no encontrado:');
console.log(productManager.getProductById(2)) // No existe (undefined)

// 5. Prueba de modificar el campo de un producto
console.log('---------------------------------------------------------');
console.log('Prueba de modificar el producto con id=1:');
console.log(productManager.updateProduct(1, { price: 250 })) // No se eliminó el id y se modificó el campo price
console.log(productManager.getProducts()); // Debe aparecer el producto recién agregado

// 6. Prueba de eliminar un producto
console.log('---------------------------------------------------------');
console.log('Prueba de agregar otro producto:');
productManager.addProduct('producto prueba2', 'Este es otro producto prueba', 300, 'Sin imagen', 'abc124', 25);
console.log(productManager.getProducts()); // Debe aparecer el producto recién agregado
console.log('---------------------------------------------------------');
console.log('Prueba de eliminar producto con id=1:');
console.log(productManager.deleteProduct(1)) // Se eliminó  
console.log('---------------------------------------------------------');
console.log(productManager.getProducts()); // Debe aparecer el array sin el producto eliminado
console.log('---------------------------------------------------------');
console.log('Prueba de producto no encontrado:');
console.log(productManager.deleteProduct(3)) // No se eliminó (no existe)
console.log('---------------------------------------------------------');

// 7. Prueba de eliminar el archivo
console.log('Prueba de eliminar el archivo:');
console.log(productManager.deleteFile()) // Se eliminó el archivo