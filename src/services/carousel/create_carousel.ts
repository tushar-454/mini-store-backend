import { Carousel, ICarousel } from '../../models/Carousel';
import { CreateCarouselInput } from '../../validation/carousel/create_carousel';

const createCarouselService = async (carousel: CreateCarouselInput): Promise<ICarousel | undefined> => {
  const { image } = carousel;
  try {
    const new_carousel = await Carousel.create({ image });
    await new_carousel.save();
    return new_carousel;
  } catch (error) {
    console.error('Error creating carousel:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createCarouselService };
