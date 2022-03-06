const stockJson = require('../database/stock.json');
const transactionsJson = require('../database/transactions.json');

class FindStock {
  async search(req, res) {
    try {
      const { findSku } = req.body;
      if (!findSku) { res.status(503).json({ 'Bad Request': 'Something went wrong!' }); }

      let order = 0;
      let refund = 0;
      let stockNumber = 0;
      let originalValue = 0;

      const stockFiltered = stockJson.filter((stockFilter) => stockFilter.sku === findSku);
      const transactionsFiltered = transactionsJson.filter(
        (transactionsFilter) => transactionsFilter.sku === findSku,
      );

      // eslint-disable-next-line no-unused-vars
      for (const { sku, type, qty } of transactionsFiltered) {
        if (type === 'refund') { refund = qty + refund; }
        if (type === 'order') { order = qty + order; }
      }

      if (stockFiltered.length !== 0) {
        stockNumber = stockFiltered[0].stock;
        originalValue = stockFiltered[0].stock;
      }

      stockNumber = (stockNumber - order) + refund;

      return res.json({
        findSku, originalValue, order, refund, stockNumber,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e,
      });
    }
  }
}

export default new FindStock();
