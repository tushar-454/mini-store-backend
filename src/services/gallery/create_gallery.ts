import { Gallery, IGallery } from '../../models/Gallery';
import { CreateGalleryInput } from '../../validation/gallery/create_gallery';

const createGalleryService = async (gallery: CreateGalleryInput): Promise<IGallery | undefined> => {
  const { src, width, height, label } = gallery;
  try {
    const new_gallery = await Gallery.create({ src, width, height, label });
    await new_gallery.save();
    return new_gallery;
  } catch (error) {
    console.error('Error creating gallery:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createGalleryService };
