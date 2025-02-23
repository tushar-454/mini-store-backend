import { Category, ICategory } from '../../models/Category';

const findCategoryByProperty = async (property: string, value: string): Promise<ICategory | undefined> => {
  try {
    const category = await Category.findOne({
      [property]: value,
    });
    return category || undefined;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error finding category by property:', error);
  }
};

export { findCategoryByProperty };
