import mongoose from 'mongoose';

const HeroSlideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.HeroSlide || mongoose.model('HeroSlide', HeroSlideSchema);
