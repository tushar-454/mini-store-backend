import { NextFunction, Request, Response } from 'express';
import { getCouponService } from '../../services/coupon/get_coupon';

const getCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coupon = await getCouponService();
    res.status(200).json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

export { getCoupon };
