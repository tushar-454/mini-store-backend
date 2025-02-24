import { NextFunction, Response } from 'express';
import { RequestWithUser } from '../../middlewares/verify_token';
import { findOrderByProperty } from '../../services/order/find_order_by_property';
import { findProductByProperty } from '../../services/product/find_product_by_property';
import { createReviewService } from '../../services/review/create_review';
import { CreateReviewInput } from '../../validation/review/create_review';

const createReview = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
  const { _id, name, email, phone, photo } = req.user!;
  const { orderId } = req.params;
  try {
    const order = await findOrderByProperty('_id', orderId);
    if (!order) {
      res.status(404).json({ success: false, error: 'order not found' });
      return;
    }
    if (order.isReviewed) {
      res.status(400).json({ success: false, error: 'order already reviewed' });
      return;
    }
    if (order.status !== 'delivered') {
      res.status(400).json({ success: false, error: 'order not delivered yet' });
      return;
    }
    const { comment, rating } = req.body as CreateReviewInput;
    if (!name || !email) {
      res.status(400).json({ success: false, error: 'update your profile with phone photo' });
      return;
    }
    const review = await createReviewService({
      user: { _id, name, email, phone, photo },
      reviewInput: { comment, rating },
    });
    order.isReviewed = true;
    const productRatingPromise = order.line_items.map(async (item) => {
      const product = await findProductByProperty('_id', item.product_id);
      if (!product) return;
      product.rating = Number(((product.rating * product.sell_count + rating) / product.sell_count).toFixed(1));
      return product.save();
    });
    await Promise.all(productRatingPromise);
    await order.save();
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    next(error);
  }
};

export { createReview };
