import { Gallery, IGallery } from '../../models/Gallery';

const findGalleryByProperty = async (property: string, value: string): Promise<IGallery | undefined> => {
  try {
    const gallery = await Gallery.findOne({
      [property]: value,
    });
    return gallery || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding gallery by property:', error);
  }
};

export { findGalleryByProperty };
