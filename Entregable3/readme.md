# Product Management Server

This server is developed using Node.js and Express to manage a list of products. The server provides various endpoints to retrieve information about products, add new products, update existing products, and delete products.

## Requirements

- Node.js installed on your machine
- Npm to install dependencies

## How to Run

1. Clone the repository to your local machine.
2. Navigate to the project directory using the command line.
3. Run the following command to install dependencies, including Express:

    ```bash
    npm install
    ```

4. Ensure that the `products.json` file is present in the `files` directory with the required product data.
5. Run the server with the following command:

    ```bash
    nodemon app.js
    ```

    This will start the server and automatically restart it whenever changes are made to the code.

6. The server will start on `http://localhost:8080`. You can access the endpoints described below.

## Endpoints

### 1. Homepage

- **Endpoint:** `/`
- **Description:** The root endpoint sends a welcome message.
- **Method:** GET
- **Example:** `http://localhost:8080/`

### 2. Get all Products and Products by Param Length Limit

- **Endpoint:** `/products`
- **Description:** Retrieves a list of products and optionally limits the response based on the "limit" query parameter.
- **Method:** GET
- **Query Parameter:** `limit` (optional)
- **Example:**

  - `http://localhost:8080/products/` (Get all products)
  - `http://localhost:8080/products/?limit=5` (Get the first 5 products)

### 3. Get Product by ID

- **Endpoint:** `/products/:id`
- **Description:** Retrieves a specific product by its ID.
- **Method:** GET
- **Parameter:** `id` (Product ID)
- **Examples:**

  - `http://localhost:8080/products/2` (Get product with ID 2)
  - `http://localhost:8080/products/34123123` (Example with non-existing ID)
    - If you attempt to retrieve a product with an ID that does not exist, the server will return an error object indicating that the product does not exist.

### Error Handling

- If a route is not found, the server returns a 404 error with the message "Route not found."

## Product Manager Class (`ProductManager.js`)

This class is responsible for managing products. It loads product data from the `products.json` file, allows adding, updating, deleting, and retrieving products.

## Important Notes

- The product data is stored in the `products.json` file. Ensure this file is present and correctly formatted.
- Products are managed using the `ProductManager` class defined in `ProductManager.js`.

Feel free to explore and extend the functionality of this server for your specific needs.
