import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SettingSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['superadmin', 'employee'], default: 'employee' },
});

SettingSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);

