import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase() {
  if (cachedDb) return cachedDb;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    cachedDb = db.connection;
    console.log('Connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}
