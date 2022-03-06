import express from 'express';
import skuRoutes from './routes/stockRoute';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', skuRoutes);
  }
}

export default new App().app;
