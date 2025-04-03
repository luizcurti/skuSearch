const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  type: { type: String, enum: ['order', 'refund'], required: true },
  qty: { type: Number, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
