import { Document, model, Schema } from 'mongoose';

interface ICarousel extends Document {
  _id: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CarouselSchema = new Schema(
  {
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Carousel = model<ICarousel>('Carousel', CarouselSchema);

export { Carousel, ICarousel };
