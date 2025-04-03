const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Stock', StockSchema);
