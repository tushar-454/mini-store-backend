import { NextFunction, Request, Response } from 'express';
import { getGalleryService } from '../../services/gallery/get_gallery';

const getGallery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const galleries = await getGalleryService();
    res.status(200).json({ success: true, data: galleries });
  } catch (error) {
    next(error);
  }
};

export { getGallery };
