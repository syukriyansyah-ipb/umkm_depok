import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    backgroundImage: { type: String, required: true },
    imageKey: { type: String, required: true },
    backgroundImageKey: { type: String, required: true },
    tiktok: { type: String, required: false },
    instagram: { type: String, required: false },
    shopee: { type: String, required: false },
    tokopedia: { type: String, required: false },
  },
  { timestamps: true }
);

export default mongoose.models.Hero || mongoose.model("Hero", HeroSchema);
