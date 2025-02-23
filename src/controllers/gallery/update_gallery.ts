import { NextFunction, Request, Response } from 'express';
import { findGalleryByProperty } from '../../services/gallery/find_gallery_by_property';
import { UpdateGalleryInput } from '../../validation/gallery/update_gallery';

const updateGallery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { galleryId } = req.params;
    const { src, width, height, label } = req.body as UpdateGalleryInput;
    const gallery = await findGalleryByProperty('_id', galleryId);
    if (!gallery) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    gallery.src = src ?? gallery.src;
    gallery.width = width ?? gallery.width;
    gallery.height = height ?? gallery.height;
    gallery.label = label ?? gallery.label;
    await gallery.save();

    res.status(200).json({
      status: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateGallery };
