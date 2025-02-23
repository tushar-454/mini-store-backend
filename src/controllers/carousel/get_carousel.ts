import { NextFunction, Request, Response } from 'express';
import { getCarouselService } from '../../services/carousel/get_carousel';

const getCarousel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const carousel = await getCarouselService();
    res.status(200).json({ success: true, data: carousel });
  } catch (error) {
    next(error);
  }
};

export { getCarousel };
