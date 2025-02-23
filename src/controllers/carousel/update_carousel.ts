import { NextFunction, Request, Response } from 'express';
import { findCarouselByProperty } from '../../services/carousel/find_carousel_by_property';
import { UpdateCarouselInput } from './../../validation/carousel/update_carousel';

const updateCarousel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { carouselId } = req.params;
    const { image } = req.body as UpdateCarouselInput;
    const carousel = await findCarouselByProperty('_id', carouselId);
    if (!carousel) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    carousel.image = image ?? carousel.image;
    await carousel.save();

    res.status(200).json({
      status: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateCarousel };
