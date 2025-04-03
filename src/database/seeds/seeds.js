const connectMongoDB = require('../mongoConnect');
const Stock = require('../model/stock');
const Transaction = require('../model/transactions');

const stockJson = require('./stock.json');
const transactionJson = require('./transactions.json');

async function seedDatabase() {
  try {
    await connectMongoDB();

    await Stock.deleteMany({});
    await Transaction.deleteMany({});

    if (stockJson.length === 0) throw new Error('Stock JSON is empty!');
    if (transactionJson.length === 0) throw new Error('Transaction JSON is empty!');

    const insertedStock = await Stock.insertMany(stockJson);
    console.log(`Inserted ${insertedStock.length} stock records.`);

    const insertedTransactions = await Transaction.insertMany(transactionJson);
    console.log(`Inserted ${insertedTransactions.length} transaction records.`);

    console.log('Database successfully populated!');
    process.exit(0);
  } catch (err) {
    console.error('Error populating the database:', err);
    process.exit(1);
  }
}

seedDatabase();
