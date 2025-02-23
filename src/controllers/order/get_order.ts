import { NextFunction, Request, Response } from 'express';
import { getOrderService } from '../../services/order/get_order';

const getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await getOrderService();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

export { getOrder };
