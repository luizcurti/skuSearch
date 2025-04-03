# skuSearch

skuSearch is a simple API for searching SKUs in a MongoDB database.

## Requirements
* Node.js
* Docker and Docker composer

## Installation
1. Clone this repository:
* git clone https://github.com/luizcurti/skuSearch.git

2. Navigate to the project directory:
* cd skuSearch

3. Install dependencies:
* npm install

## Running the API
### Using Docker

1. Start the container:
* docker-compose up

2. Using Nodemon
* Start the server with:

3. npm install -g nodemon
* nodemon server.js

## API Endpoints
### Search SKU

* URL: POST /sku/
* Request Body:
{
  "findSku": "LTV719449/39/39"
}

* Successful Response:
{
  "sku": "LTV719449/39/39",
  "name": "Example Product",
  "price": 99.90
}

### Tests
1. To run tests, use:
* npx jest test

## Contribution
Feel free to open issues or submit pull requests.