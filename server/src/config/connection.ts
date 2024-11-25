// server/src/config/connection.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const db = async (): Promise<typeof mongoose.connection> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || '', {});
    console.log('MongoDB connection successful.');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export default db;