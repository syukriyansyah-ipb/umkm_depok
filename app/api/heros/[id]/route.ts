import  dbConnect  from "@/lib/db";
import Hero from "@/libs/models/Hero";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { params } = context;
    const id = params.id;
    const body = await request.json();
    const { title, description, image, backgroundImage, imageKey, backgroundImageKey, tiktok, instagram, shopee, tokopedia } = body;

    await dbConnect();
    const updatedHero = await Hero.findByIdAndUpdate(new ObjectId(id), { title, description, image, backgroundImage, imageKey, backgroundImageKey, tiktok, instagram, shopee, tokopedia });

    return NextResponse.json({ message: "Hero updated successfully", data: updatedHero });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed to update hero", error }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    await dbConnect();
    await Hero.findByIdAndDelete(new ObjectId(id) );

    return NextResponse.json({ message: "Hero deleted successfully" });
  } catch (error) {
    return NextResponse.json({ message: "Failed to delete hero", error }, { status: 400 });
  }
}
