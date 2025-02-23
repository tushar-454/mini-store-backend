import { NextFunction, Request, Response } from 'express';
import { createProductService } from '../../services/product/create_product';
import { CreateProductInput } from '../../validation/product/create_product';

const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, description, price, discount, category, images, variants } = req.body as CreateProductInput;
    const product = await createProductService({ name, description, price, discount, category, images, variants });
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export { createProduct };
