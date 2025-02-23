import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  photo: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  is_deleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    password: { type: String, default: null },
    photo: { type: String, default: null },
    role: { type: String, required: true, default: 'user' },
    status: { type: String, required: true, default: 'active' },
    is_deleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false }
);

const User = model<IUser>('User', userSchema);

export { IUser, User };
