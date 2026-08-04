import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database.uri);

    console.log('✅ MongoDB connected successfully.');
  } catch (error) {
    console.error('❌ MongoDB connection failed.');
    console.error(error.message);

    process.exit(1);
  }
};

export default connectDB;