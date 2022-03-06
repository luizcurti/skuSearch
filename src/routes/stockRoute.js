import { Router } from 'express';
import findStock from '../controllers/stockController';

const router = new Router();

router.post('/sku', findStock.search);

export default router;
