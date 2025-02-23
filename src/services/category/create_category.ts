import { Category, ICategory } from '../../models/Category';
import { CreateCategoryInput } from '../../validation/category/create_category';

const createCategoryService = async (category: CreateCategoryInput): Promise<ICategory | undefined> => {
  const { name, photo } = category;
  try {
    const new_category = await Category.create({ name, photo });
    await new_category.save();
    return new_category;
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { createCategoryService };
