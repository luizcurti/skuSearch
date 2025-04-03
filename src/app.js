const express = require('express');
const connectMongoDB = require('./database/mongoConnect');
const skuRoutes = require('./routes/stockRoute');

class App {
  constructor() {
    this.app = express();
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  connectDB() {
    connectMongoDB();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', skuRoutes);
  }
}

module.exports = new App().app;
