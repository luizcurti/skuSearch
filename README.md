# SKU Search API
skuSearch is a simple RESTful API for managing and searching SKU (Stock Keeping Units) information. It allows users to search for specific SKUs and also get a complete list of all registered SKUs. The API is useful for integrating with inventory management systems, e-commerce platforms, or other inventory management solutions.

## Features
Search SKU (POST /sku): Allows users to search for a specific SKU and receive details about stock, orders, and refunds.

List All SKUs (GET /sku/all): Returns a list of all registered SKUs with their stock and transaction information.

## Technologies
* Node.js
* Express.js
* MongoDB (optional, if you use a database for persistence)
* Jest (for testing)
* Docker (for containerization)
* Docker Compose (for multi-container environments)

## How to Use
Using Docker

1. Clone the repository:
* git clone https://github.com/luizcurti/skuSearch.git

2. Build and run the containers: You can use Docker to build and run the application in containers.
* docker-compose up --build

This command will build the application and start the containers defined in the docker-compose.yml file.

Note: The Docker setup also handles the migration of the MongoDB database automatically when the application starts, ensuring that the necessary collections and data are available.

Access the application: The application will be accessible at http://localhost:3000.

Without Docker (Locally)
If you prefer to run the application without Docker, you can follow these steps:

1. Install dependencies:
* npm install

2. Start the server:
* npm start

3. Use the API:
* POST /sku: Sends an SKU and retrieves detailed information about stock and transactions.
* GET /sku/all: Retrieves all SKUs with their stock information.

## Testing
The API includes automated tests using Jest to ensure the correct functionality of the main features.

To run the tests, execute:
npm test

## Docker and Docker Compose
Docker: The application can be containerized using Docker. The Dockerfile defines how the application is built and runs in a container. Additionally, it takes care of running any necessary migrations to the MongoDB database when the containers are started, ensuring the database is set up and populated correctly.

Docker Compose: The project includes a docker-compose.yml file to easily manage multi-container setups. It configures the app and any services, such as MongoDB (if used), so you can run the entire stack with a single command.

## Running with Docker Compose
Ensure Docker and Docker Compose are installed on your system. If not, you can download them from the official Docker website: https://www.docker.com/get-started.

## Build and start the containers:
docker-compose up --build

Access the application: The application will be available at http://localhost:3000.