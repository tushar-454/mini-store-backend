import { NextFunction, Request, Response } from 'express';
import { findGalleryByProperty } from '../../services/gallery/find_gallery_by_property';

const deleteGallery = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { galleryId } = req.params;
    const gallery = await findGalleryByProperty('_id', galleryId);
    if (!gallery) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await gallery.deleteOne();
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

export { deleteGallery };
