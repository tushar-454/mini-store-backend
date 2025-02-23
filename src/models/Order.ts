import { Document, model, Schema } from 'mongoose';

interface IOrder extends Document {
  _id: string;
  user: Schema.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  photo: string;
  line_items: {
    product_id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variant: string;
    discount: number;
  }[];
  price: number;
  discount: number;
  shipping: number;
  status: string;
  is_deleted: boolean;
  division: string;
  district: string;
  sub_district: string;
  union: string;
  village: string;
  address: string;
  coupon_code: string;
  coupon_discount: number;
  tracking_id: number;
  instruction: string;
  isReviewed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema: Schema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    photo: { type: String, default: null },
    line_items: {
      type: [
        {
          product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
          name: { type: String, required: true },
          image: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          variant: { type: String, required: true },
          discount: { type: Number, default: 0 },
        },
      ],
      required: true,
    },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    shipping: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirm', 'cooking', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    is_deleted: { type: Boolean, default: false },
    division: { type: String, required: true },
    district: { type: String, required: true },
    sub_district: { type: String, required: true },
    union: { type: String, default: null },
    village: { type: String, default: null },
    address: { type: String, required: true },
    coupon_code: { type: String, default: null },
    coupon_discount: { type: Number, default: null },
    tracking_id: { type: Number, unique: true, required: true },
    instruction: { type: String, default: null },
    isReviewed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = model<IOrder>('Order', orderSchema);

export { IOrder, Order };
