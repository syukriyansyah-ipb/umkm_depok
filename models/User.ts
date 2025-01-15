import { Schema, model, models } from 'mongoose';

interface User {
  username: string;
  password: string;
  role: 'superadmin' | 'employee';
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'employee'], required: true },
});

const UserModel = models.User || model<User>('User', userSchema);

export default UserModel;
