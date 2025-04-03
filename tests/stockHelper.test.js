const {
  getStockData, getTransactionData, calculateTransactions, calculateStock,
} = require('../src/helpers/stockHelper');

const Stock = require('../src/database/model/stock');
const Transaction = require('../src/database/model/transactions');

jest.mock('../src/database/model/stock');
jest.mock('../src/database/model/transactions');

describe('Stock Helper Functions', () => {
  describe('getStockData', () => {
    it('should return stock data if SKU exists', async () => {
      const mockStock = { sku: 'QQO675265/24/21', stock: 100 };
      Stock.findOne.mockResolvedValue(mockStock);

      const result = await getStockData('QQO675265/24/21');
      expect(result).toEqual(mockStock);
    });

    it('should throw an error if SKU does not exist', async () => {
      Stock.findOne.mockResolvedValue(null);

      await expect(getStockData('NON_EXISTENT_SKU')).rejects.toThrow('SKU not found in stock');
    });
  });

  describe('getTransactionData', () => {
    it('should return transaction data if transactions exist', async () => {
      const mockTransactions = [
        { sku: 'QQO675265/24/21', type: 'order', qty: 10 },
        { sku: 'QQO675265/24/21', type: 'refund', qty: 5 },
      ];
      Transaction.find.mockResolvedValue(mockTransactions);

      const result = await getTransactionData('QQO675265/24/21');
      expect(result).toEqual(mockTransactions);
    });
  });

  describe('calculateTransactions', () => {
    it('should calculate order and refund quantities correctly', () => {
      const transactions = [
        { type: 'order', qty: 10 },
        { type: 'refund', qty: 5 },
        { type: 'order', qty: 20 },
      ];

      const result = calculateTransactions(transactions);
      expect(result.order).toBe(30);
      expect(result.refund).toBe(5);
    });

    it('should return 0 order and refund when no transactions exist', () => {
      const result = calculateTransactions([]);
      expect(result.order).toBe(0);
      expect(result.refund).toBe(0);
    });
  });

  describe('calculateStock', () => {
    it('should calculate the correct stock number', () => {
      const stockData = { stock: 100 };
      const order = 30;
      const refund = 5;

      const result = calculateStock(stockData, order, refund);
      expect(result).toBe(75);
    });
  });
});
