# Microservice-ProductService

This project is a microservice for product management that is part of a microservices architecture. The service handles product creation, retrieval, updating, and deletion, and is developed with Node.js for the backend.

# Features

- Product Creation: Allow users to create new products with relevant details such as name, description, price, and images.
- Product Retrieval: Retrieve a list of all products or a specific product by its unique identifier.
- Product Update: Update existing product details.
- Product Deletion: Remove products from the database.
- Integration with User Service: Authenticate users through JWT tokens to ensure secure access to product management functionalities.
- Database Management: Uses Sequelize ORM for database interactions with MySQL.
  
# Technologies Used

- Node.js: The runtime environment for executing JavaScript on the server side.
- Express.js: A web application framework for Node.js, used to build the API.
- Sequelize: A promise-based Node.js ORM for MySQL, used to interact with the database.
- MySQL: A relational database management system for storing product data.
- JSON Web Token (JWT): Used for user authentication and secure access to API endpoints.
- dotenv: For environment variable management.
