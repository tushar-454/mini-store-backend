import { NextFunction, Request, Response } from 'express';
import { findProductByProperty } from '../../services/product/find_product_by_property';

const getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const product = await findProductByProperty('slug', slug);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export { getProductBySlug };
