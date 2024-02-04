// DESAFÍO ENTREGABLE 1
// Alumno: Lucas Gallo
// Fecha: 04/02/2024

class ProductManager {
    constructor() {
        this.products = []; // Inicializo la lista de productos como un arreglo vacío
        this.idCounter = 1; // Inicializo el contador de id
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
            id: this.idCounter++, // id autoincrementable
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };
        this.products.push(product);

        console.log(`Producto agregado: ${title} (id: ${product.id})`);
    }

    getProducts() {
        // Devolver el arreglo con todos los productos
        return this.products;
    }

    getProductById(id) {
        // Buscar el producto por id
        const product = this.products.find(p => p.id === id);

        // Mostrar el producto o un mensaje de error si no se encuentra
        if (product) {
            return product;
        } else {
            console.error(`ERROR: producto con id ${id} no encontrado`);
        }
    }
}

const productManager = new ProductManager();


// Testing
// 1. Prueba de array vacío
console.log('---------------------------------------------------------');
console.log('Prueba de array vacío:');
console.log(productManager.getProducts());

// 2. Prueba de agregar un producto
console.log('---------------------------------------------------------');
console.log('Prueba de agregar 1 producto:');
productManager.addProduct('Producto de prueba 1', 'Este es un producto de prueba', 500, 'Sin imagen', '001', 100);
console.log(productManager.getProducts());

// 3. Prueba de producto con datos faltantes
console.log('---------------------------------------------------------');
console.log('Prueba de agregar 1 producto con datos faltantes:');
productManager.addProduct('Producto de prueba 2', 'Este es otro producto de prueba', 2000, 'Sin imagen', '002')

// 4 . Prueba del id autoincremental
console.log('---------------------------------------------------------');
console.log('Prueba de id autoincrementable:');
productManager.addProduct('Producto de prueba 2', 'Este es otro producto de prueba', 1000, 'Sin imagen', '002', 100)
productManager.addProduct('Producto de prueba 3', 'Este es otro producto de prueba', 2000, 'Sin imagen', '003', 100)
productManager.addProduct('Producto de prueba 4', 'Este es otro producto de prueba', 3000, 'Sin imagen', '004', 100)
console.log(productManager.getProducts());

// 5. Prueba con producto repetido
console.log('---------------------------------------------------------');
console.log('Prueba de producto repetido:');
productManager.addProduct('Producto de prueba 4', 'Este es otro producto de prueba', 3000, 'Sin imagen', '004', 100)

// 6. Prueba de buscar un producto por id
console.log('---------------------------------------------------------');
console.log('Prueba de producto encontrado por id=4:');
console.log(productManager.getProductById(4)) // existe
console.log('---------------------------------------------------------');
console.log('Prueba de producto no encontrado:');
console.log(productManager.getProductById(1000)) // no existe (undefined)
console.log('---------------------------------------------------------');