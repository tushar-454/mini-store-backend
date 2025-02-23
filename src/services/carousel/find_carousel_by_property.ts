import { Carousel, ICarousel } from '../../models/Carousel';

const findCarouselByProperty = async (property: string, value: string): Promise<ICarousel | undefined> => {
  try {
    const carousel = await Carousel.findOne({
      [property]: value,
    });
    return carousel || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding carousel by property:', error);
  }
};

export { findCarouselByProperty };
