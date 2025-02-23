import { NextFunction, Request, Response } from 'express';
import { findCategoryByProperty } from '../../services/category/find_category_by_property';

const deleteCategory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryId } = req.params;
    const category = await findCategoryByProperty('_id', categoryId);
    if (!category) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await category.deleteOne();
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

export { deleteCategory };
