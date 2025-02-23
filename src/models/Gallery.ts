import { Document, model, Schema } from 'mongoose';

interface IGallery extends Document {
  _id: string;
  src: string;
  width: number;
  height: number;
  label: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const GallerySchema = new Schema(
  {
    src: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    label: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Gallery = model<IGallery>('Gallery', GallerySchema);

export { Gallery, IGallery };
