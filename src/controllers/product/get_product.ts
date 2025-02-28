import { NextFunction, Request, Response } from 'express';
import { IProduct } from '../../models/Product';
import { getProductService } from '../../services/product/get_product';

export type TQuery = {
  min_price?: number;
  max_price?: number;
  length?: string;
};

const getProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price, length } = req.query as Partial<IProduct> & TQuery;
    const products = await getProductService({ is_featured, is_deleted, sell_count, is_upcoming, category, min_price, max_price });
    res.status(200).json({ success: true, data: length === 'true' ? products?.length : products });
  } catch (error) {
    next(error);
  }
};

export { getProduct };
