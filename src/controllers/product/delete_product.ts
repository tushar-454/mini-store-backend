import { NextFunction, Request, Response } from 'express';
import { findProductByProperty } from '../../services/product/find_product_by_property';

const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params;
    const product = await findProductByProperty('_id', productId);
    if (!product) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await product.deleteOne();
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

export { deleteProduct };
