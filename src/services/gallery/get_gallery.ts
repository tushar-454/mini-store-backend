import { Gallery, IGallery } from '../../models/Gallery';

const getGalleryService = async (): Promise<IGallery[] | undefined> => {
  try {
    const galleries = await Gallery.find().sort({ createdAt: -1 }).select({
      createdAt: 0,
      updatedAt: 0,
    });
    return galleries || [];
  } catch (error) {
    console.log('Error in getGalleryService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getGalleryService };
