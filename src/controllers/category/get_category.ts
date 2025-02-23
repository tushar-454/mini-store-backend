import { NextFunction, Request, Response } from 'express';
import { getCategoryService } from '../../services/category/get_category';

const getCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const category = await getCategoryService();
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

export { getCategory };
