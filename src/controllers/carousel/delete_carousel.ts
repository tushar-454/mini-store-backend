import { NextFunction, Request, Response } from 'express';
import { findCarouselByProperty } from '../../services/carousel/find_carousel_by_property';

const deleteCarousel = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { carouselId } = req.params;
    const carousel = await findCarouselByProperty('_id', carouselId);
    if (!carousel) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await carousel.deleteOne();
    if (result.deletedCount === 0) {
      res.status(500).json({
        success: false,
        error: 'Problem occur while deleting.',
      });
      return;
    }
    res.status(204).json({
      status: true,
      message: 'Resource deleted',
    });
  } catch (error) {
    next(error);
  }
};

export { deleteCarousel };
