import { NextFunction, Request, Response } from 'express';
import { createGalleryService } from '../../services/gallery/create_gallery';
import { CreateGalleryInput } from '../../validation/gallery/create_gallery';

const createGallery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { src, width, height, label } = req.body as CreateGalleryInput;
    const gallery = await createGalleryService({ src, width, height, label });
    res.status(201).json({ success: true, data: gallery });
  } catch (error) {
    next(error);
  }
};

export { createGallery };
