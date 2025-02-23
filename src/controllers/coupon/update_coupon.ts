import { NextFunction, Request, Response } from 'express';
import { findCouponByProperty } from '../../services/coupon/find_coupon_by_property';
import { UpdateCouponInput } from '../../validation/coupon/update_coupon';

const updateCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { couponId } = req.params;
    const { code, type, discount, quantity, startAt, expireAt } = req.body as UpdateCouponInput;
    const coupon = await findCouponByProperty('_id', couponId);
    if (!coupon) {
      res.status(400).json({
        success: false,
        error: 'Resource not found',
      });
      return;
    }
    coupon.code = code ?? coupon.code;
    coupon.type = type ?? coupon.type;
    coupon.discount = discount ?? coupon.discount;
    coupon.quantity = quantity ?? coupon.quantity;
    coupon.startAt = startAt ?? coupon.startAt;
    coupon.expireAt = expireAt ?? coupon.expireAt;
    await coupon.save();

    res.status(200).json({
      status: true,
      message: 'Resource updated',
    });
  } catch (error) {
    next(error);
  }
};

export { updateCoupon };
