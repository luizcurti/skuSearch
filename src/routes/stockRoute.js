const Router = require('express');
const findStock = require('../controllers/stockController');

const router = new Router();

router.post('/sku', findStock.search);
router.get('/sku', findStock.listAll);

module.exports = router;
