import { NextFunction, Request, Response } from 'express';
import { createCategoryService } from '../../services/category/create_category';
import { CreateCategoryInput } from '../../validation/category/create_category';

const createCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, photo } = req.body as CreateCategoryInput;
    const category = await createCategoryService({ name, photo });
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export { createCategory };
