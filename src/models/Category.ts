import { Document, model, Schema } from 'mongoose';

interface ICategory extends Document {
  _id: string;
  name: string;
  photo: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Category = model<ICategory>('Category', CategorySchema);

export { Category, ICategory };
