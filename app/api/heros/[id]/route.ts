// import dbConnect from "@/lib/db";
// import Hero from "@/libs/models/Hero";
// import { NextRequest, NextResponse } from "next/server";
// import { ObjectId } from "mongodb";

// export async function PUT(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     // Ambil ID dari URL
//     const id = request.nextUrl.pathname.split("/").pop();
//     if (!id) return NextResponse.json({ message: "Missing ID parameter" }, { status: 400 });

//     const body = await request.json();
//     const updatedHero = await Hero.findByIdAndUpdate(new ObjectId(id), body, { new: true });

//     return NextResponse.json({ message: "Hero updated successfully", data: updatedHero });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Failed to update hero", error }, { status: 400 });
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     await dbConnect();
    
//     // Ambil ID dari URL
//     const id = request.nextUrl.pathname.split("/").pop();
//     if (!id) return NextResponse.json({ message: "Missing ID parameter" }, { status: 400 });

//     await Hero.findByIdAndDelete(new ObjectId(id));

//     return NextResponse.json({ message: "Hero deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ message: "Failed to delete hero", error }, { status: 400 });
//   }
// }
