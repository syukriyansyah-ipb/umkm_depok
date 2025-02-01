import { NextResponse } from "next/server";
import clientPromise from "@/utils/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const items = await db.collection("items").find({}).toArray();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  const { name, description } = await req.json();
  if (!name || !description) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db("mydatabase");
  const result = await db.collection("items").insertOne({ name, description });
  return NextResponse.json(result);
}
