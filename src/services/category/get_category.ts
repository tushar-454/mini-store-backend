import { Category, ICategory } from '../../models/Category';

const getCategoryService = async (): Promise<ICategory[] | undefined> => {
  try {
    const category = await Category.find().select({
      createdAt: 0,
      updatedAt: 0,
    });
    return category || [];
  } catch (error) {
    console.log('Error in getCategoryService', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getCategoryService };
