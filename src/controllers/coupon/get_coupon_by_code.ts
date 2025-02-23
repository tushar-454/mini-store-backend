import { NextFunction, Request, Response } from 'express';
import { findCouponByProperty } from '../../services/coupon/find_coupon_by_property';

const getCouponByCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code } = req.params;
    const coupon = await findCouponByProperty('code', code);
    if (!coupon) {
      res.status(404).json({ success: false, message: 'Coupon not found' });
      return;
    }
    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

export { getCouponByCode };
