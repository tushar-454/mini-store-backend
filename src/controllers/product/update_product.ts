import { NextFunction, Request, Response } from 'express';
import { findProductByProperty } from '../../services/product/find_product_by_property';
import { UpdateProductInput } from '../../validation/product/update_product';

const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId } = req.params;
    const { category, description, discount, images, is_deleted, is_featured, is_upcoming, name, rating, sell_count, price, status, stock, variants } = req.body as UpdateProductInput;
    const product = await findProductByProperty('_id', productId);
    if (!product) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.discount = discount ?? product.discount;
    product.images = images ?? product.images;
    product.is_deleted = is_deleted ?? product.is_deleted;
    product.is_featured = is_featured ?? product.is_featured;
    product.is_upcoming = is_upcoming ?? product.is_upcoming;
    product.name = name ?? product.name;
    product.rating = rating ?? product.rating;
    product.sell_count = sell_count ?? product.sell_count;
    product.price = price ?? product.price;
    product.status = status ?? product.status;
    product.stock = stock ?? product.stock;
    product.variants = variants ?? product.variants;
    product.slug = name ? name.toLowerCase().replace(/ /g, '-') : product.slug;
    await product.save();

    res.status(200).json({
      status: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateProduct };
