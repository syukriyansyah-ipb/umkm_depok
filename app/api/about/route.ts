import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { About } from "@/models/About"

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string)
    const umkm = await About.findOne()

    return NextResponse.json(umkm)
  } catch (error) {
    console.error("Error fetching UMKM data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
   
    await mongoose.connect(process.env.MONGODB_URI as string)

    const updatedData = {
      name: formData.get("name"),
      address: formData.get("address"),
      mapUrl: formData.get("mapUrl"),
      description: formData.get("description"),
      phoneNumber: formData.get("phoneNumber"),
      email: formData.get("email"),
      socialMedia: {
        facebook: formData.get("facebook"),
        instagram: formData.get("instagram"),
        tokopedia: formData.get("tokopedia"),
        tiktok: formData.get("tiktok"),
        shopee: formData.get("shopee"),
      },
    }

    await About.findOneAndUpdate({}, { $set: updatedData }, { upsert: true, new: true })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating UMKM data:", error)
    return NextResponse.json({ success: false, error: "Failed to update UMKM data" }, { status: 500 })
  }
}

