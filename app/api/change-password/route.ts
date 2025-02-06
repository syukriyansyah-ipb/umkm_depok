import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  const { userId, newPassword } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, {
      password: hashedPassword,
      isPasswordChanged: true,
    });

    return NextResponse.json({ message: "Password berhasil diubah" });
  } catch (err) {
    return NextResponse.json(
      { message: "Gagal mengubah password" },
      { status: 500 }
    );
  }
}