import { NextFunction, Request, Response } from 'express';
import { findOrderByProperty } from '../../services/order/find_order_by_property';

const orderTracking = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { trackingId } = req.params;
    const order = await findOrderByProperty('tracking_id', trackingId);
    if (!order) {
      res.status(404).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

export { orderTracking };
