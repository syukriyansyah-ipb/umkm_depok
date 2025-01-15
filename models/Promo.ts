import mongoose from 'mongoose';

const PromoSchema = new mongoose.Schema({
  title: String,
  description: String,
  color: String,
});

export default mongoose.models.Promo || mongoose.model('Promo', PromoSchema);

