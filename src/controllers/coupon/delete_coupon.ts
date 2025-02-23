import { NextFunction, Request, Response } from 'express';
import { findCouponByProperty } from '../../services/coupon/find_coupon_by_property';

const deleteCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { couponId } = req.params;
    const coupon = await findCouponByProperty('_id', couponId);
    if (!coupon) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    const result = await coupon.deleteOne();
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

export { deleteCoupon };
