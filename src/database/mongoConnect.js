const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/sku_search';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
