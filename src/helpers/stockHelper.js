const Stock = require('../database/model/stock');
const Transaction = require('../database/model/transactions');

async function getStockData(sku) {
  const stock = await Stock.findOne({ sku });
  if (!stock) {
    throw new Error('SKU not found in stock');
  }
  return stock;
}

async function getTransactionData(sku) {
  return Transaction.find({ sku });
}

function calculateTransactions(transactions) {
  let order = 0;
  let refund = 0;

  if (!transactions || transactions.length === 0) {
    return { order, refund };
  }

  transactions.forEach(({ type, qty }) => {
    if (type === 'refund') {
      refund += qty;
    }
    if (type === 'order') {
      order += qty;
    }
  });
  return { order, refund };
}

const calculateStock = (stockData, order, refund) => (stockData.stock - order) + refund;

module.exports = {
  getStockData,
  getTransactionData,
  calculateTransactions,
  calculateStock,
};
