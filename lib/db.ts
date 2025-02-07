// lib/db.ts
import mongoose from 'mongoose';

let cachedDb: mongoose.Mongoose | null = null;

export async function dbConnect(): Promise<mongoose.Mongoose> {
  if (cachedDb) {
    return cachedDb;
  }

  const db = await mongoose.connect(process.env.MONGODB_URI!); // Or your connection string
  cachedDb = db;
  return db;
}
