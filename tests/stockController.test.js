const { search, listAll } = require('../src/controllers/stockController');
const Stock = require('../src/database/model/stock');
const {
  getStockData, getTransactionData, calculateTransactions, calculateStock,
} = require('../src/helpers/stockHelper');

jest.mock('../src/database/model/stock');
jest.mock('../src/database/model/transactions');
jest.mock('../src/helpers/stockHelper');

describe('listAll', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all stock items with sku and stock', async () => {
    const mockStockItems = [
      { sku: 'QQO675265/24/21', stock: 100 },
      { sku: 'LTV719449/39/39', stock: 50 },
    ];

    Stock.find.mockReturnValue({
      select: jest.fn().mockResolvedValue(mockStockItems),
    });

    const req = { body: '' };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await listAll(req, res);

    expect(res.json).toHaveBeenCalledWith(mockStockItems);
  });

  it('should return 404 if no stock items are found', async () => {
    Stock.find.mockReturnValue({
      select: jest.fn().mockResolvedValue([]),
    });

    const req = { body: '' };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await listAll(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'No items found in stock.' });
  });

  it('should return 500 if there is a database error', async () => {
    jest.spyOn(Stock, 'find').mockImplementation(() => {
      throw new Error('Database connection failed');
    });

    const req = { test: '1' };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await listAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Database connection failed' });
  });
});

describe('search', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return stock data for a valid SKU', async () => {
    const mockStockData = { sku: 'QQO675265/24/21', stock: 100 };
    const mockTransactionsData = [
      { type: 'order', qty: 10 },
      { type: 'refund', qty: 5 },
    ];

    getStockData.mockResolvedValue(mockStockData);
    getTransactionData.mockResolvedValue(mockTransactionsData);
    calculateTransactions.mockReturnValue({ order: 10, refund: 5 });
    calculateStock.mockReturnValue(95);

    const req = { body: { findSku: 'QQO675265/24/21' } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await search(req, res);

    expect(res.json).toHaveBeenCalledWith({
      findSku: 'QQO675265/24/21',
      originalValue: 100,
      order: 10,
      refund: 5,
      stockNumber: 95,
    });
  });

  it('should return error if SKU is invalid (number instead of string)', async () => {
    const req = { body: { findSku: 10 } };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    await search(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      errors: 'Invalid SKU provided.',
    });
  });
});
