// app/api/products/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/libs/mongoConnect";

export async function GET() {
  const db = await connectToDatabase();
  const bestSellers = await db.collection("products").find({ isBestSeller: true }).toArray();
  const allProducts = await db.collection("products").find().toArray();

  return NextResponse.json({
    bestSellers,
    allProducts,
  });
}

export async function POST(req: Request) {
  const db = await connectToDatabase();
  const body = await req.json();
  const newProduct = body;

  await db.collection("products").insertOne(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
