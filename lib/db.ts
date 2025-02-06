import mongoose from "mongoose";
import User from "@/models/User";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached: {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
};

if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
cached = global.mongoose;

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Fungsi untuk setup superadmin default
async function setupSuperadmin() {
  await dbConnect();

  const superadmin = await User.findOne({ username: "superadmin" });

  if (!superadmin) {
    await User.create({
      username: "superadmin",
      password: "12345678", // Password default
      role: "superadmin",
      isPasswordChanged: false, // Password belum diubah
    });
    console.log("Superadmin created successfully!");
  }
}

setupSuperadmin();

export default dbConnect;