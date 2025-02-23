import { NextFunction, Request, Response } from 'express';
import { createCarouselService } from '../../services/carousel/create_carousel';
import { CreateCarouselInput } from '../../validation/carousel/create_carousel';

const createCarousel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { image } = req.body as CreateCarouselInput;
    const carousel = await createCarouselService({ image });
    res.status(201).json({
      success: true,
      data: carousel,
    });
  } catch (error) {
    next(error);
  }
};

export { createCarousel };
