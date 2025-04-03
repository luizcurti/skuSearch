const Stock = require('../database/model/stock');

const {
  getStockData, getTransactionData, calculateTransactions, calculateStock,
} = require('../helpers/stockHelper');

async function listAll(req, res) {
  try {
    const allStockItems = await Stock.find().select('sku stock');

    if (allStockItems.length === 0) {
      return res.status(404).json({ message: 'No items found in stock.' });
    }

    return res.json(allStockItems);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function search(req, res) {
  try {
    const { findSku } = req.body;

    if (typeof findSku !== 'string' || findSku.trim() === '') {
      throw new Error('Invalid SKU provided.');
    }

    const stockData = await getStockData(findSku);
    const transactionsData = await getTransactionData(findSku);

    const { order, refund } = calculateTransactions(transactionsData);
    const stockNumber = calculateStock(stockData, order, refund);

    return res.json({
      findSku,
      originalValue: stockData.stock,
      order,
      refund,
      stockNumber,
    });
  } catch (e) {
    console.error('Error:', e.message);
    return res.status(400).json({
      errors: e.message,
    });
  }
}

module.exports = { search, listAll };
