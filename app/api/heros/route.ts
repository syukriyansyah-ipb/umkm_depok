import  {dbConnect}  from "@/lib/db";
import Hero from "@/libs/models/Hero";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image, backgroundImage, imageKey, backgroundImageKey, tiktok, instagram,  shopee, tokopedia } = body;

    await dbConnect();
    const hero = await Hero.create({ title, description, image, backgroundImage, imageKey, backgroundImageKey, tiktok, instagram, shopee, tokopedia });

    return NextResponse.json({ message: "Hero created successfully", data: hero });
  } catch (error) {
    return NextResponse.json({ message: "Failed to create hero", error }, { status: 400 });
  }
}

export async function GET() {
  try {
    // await connectMongoDB();
    const heroes = await Hero.find();

    return NextResponse.json({ message: "Heroes fetched successfully", data: heroes });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch heroes", error }, { status: 400 });
  }
}
