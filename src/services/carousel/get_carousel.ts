import { Carousel, ICarousel } from '../../models/Carousel';

const getCarouselService = async (): Promise<ICarousel[] | undefined> => {
  try {
    const carousel = await Carousel.find().select({
      createdAt: 0,
      updatedAt: 0,
    });
    return carousel || [];
  } catch (error) {
    console.log('Error in getCarouselService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getCarouselService };
