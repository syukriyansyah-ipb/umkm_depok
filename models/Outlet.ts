import mongoose from 'mongoose';

const OutletSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

export default mongoose.models.Outlet || mongoose.model('Outlet', OutletSchema);

