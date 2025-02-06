import mongoose from "mongoose"

const AboutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mapUrl: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  socialMedia: {
    facebook: { type: String },
    instagram: { type: String },
    tokopedia: { type: String },
    tiktok: { type: String },
    shopee: { type: String },
  },
})

export const About = mongoose.models.About || mongoose.model("About", AboutSchema)

