// app/api/users/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  const db = await connectToDatabase();
  const users = await db.collection("users").find().toArray();

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const db = await connectToDatabase();
  const body = await req.json();
  const newUser = body;

  await db.collection("users").insertOne(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
