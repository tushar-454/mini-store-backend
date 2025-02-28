import { NextFunction, Request, Response } from 'express';
import { getOrderService } from '../../services/order/get_order';

const getOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { startDate, endDate, status, length } = req.query;
    const orders = await getOrderService({
      startDate: typeof startDate === 'string' ? startDate : undefined,
      endDate: typeof endDate === 'string' ? endDate : undefined,
      status: typeof status === 'string' ? status : undefined,
    });
    res.status(200).json({ success: true, data: length === 'true' ? orders?.length : orders });
  } catch (error) {
    next(error);
  }
};

export { getOrder };
