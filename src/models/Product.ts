import { Document, model, Schema } from 'mongoose';

interface IProduct extends Document {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  images: string[];
  is_featured: boolean;
  is_upcoming: boolean;
  is_deleted: boolean;
  sell_count: number;
  rating: number;
  category: string;
  variants: {
    _id: string;
    name: string;
    price: number;
  }[];
  status: 'active' | 'inactive' | 'stock out';
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: { type: [String], required: true },
    is_featured: { type: Boolean, default: false },
    is_upcoming: { type: Boolean, default: false },
    is_deleted: { type: Boolean, default: false },
    sell_count: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    category: { type: String, required: true },
    variants: { type: [{ name: String, price: Number }], required: true },
    status: { type: String, default: 'active' },
    slug: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Product = model<IProduct>('Product', productSchema);

export { IProduct, Product };
