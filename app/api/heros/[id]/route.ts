import dbConnect from "@/lib/db";
import Hero from "@/libs/models/Hero";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { id } = params; // Ambil ID dari params

    const updatedHero = await Hero.findByIdAndUpdate(new ObjectId(id), body, { new: true });

    return NextResponse.json({ message: "Hero updated successfully", data: updatedHero });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to update hero", error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = params; // Ambil ID dari params

    await Hero.findByIdAndDelete(new ObjectId(id));

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete hero", error }, { status: 400 });
  }
}
