import mongoose from 'mongoose'

const HeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  order: { type: Number, required: true, default: 0 },
})

export default mongoose.models.Hero || mongoose.model('Hero', HeroSchema)

