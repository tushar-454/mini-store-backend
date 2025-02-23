import { NextFunction, Request, Response } from 'express';
import { findOrderByProperty } from '../../services/order/find_order_by_property';

const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { orderId } = req.params;
    const order = await findOrderByProperty('_id', orderId);
    if (!order) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await order.deleteOne();
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

export { deleteOrder };
