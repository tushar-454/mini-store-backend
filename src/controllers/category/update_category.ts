import { NextFunction, Request, Response } from 'express';
import { findCategoryByProperty } from '../../services/category/find_category_by_property';
import { UpdateCategoryInput } from '../../validation/category/update_category';

const updateCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const { name, photo } = req.body as UpdateCategoryInput;
    const category = await findCategoryByProperty('_id', categoryId);
    if (!category) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    category.name = name ?? category.name;
    category.photo = photo ?? category.photo;
    await category.save();

    res.status(200).json({
      status: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateCategory };
