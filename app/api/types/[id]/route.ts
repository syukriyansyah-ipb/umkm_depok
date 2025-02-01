import { NextResponse } from "next/server";
import clientPromise from "@/utils/db";
import { ObjectId } from "mongodb";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description } = await req.json();

  if (!name || !description) {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("mydatabase");
  const result = await db.collection("items").updateOne(
    { _id: new ObjectId(id) },
    { $set: { name, description } }
  );
  return NextResponse.json(result);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const client = await clientPromise;
  const db = client.db("mydatabase");
  const result = await db.collection("items").deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
}
