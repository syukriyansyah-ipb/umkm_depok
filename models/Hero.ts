import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a product title'],
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
  },
  backgroundImageUrl: {
    type: String,
    required: [true, 'Please provide an backgroundimage URL'],
  },
  socialLinks: {
    instagram: String,
    facebook: String,
    tiktok: String,
    shopee: String,
    tokopedia: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema);