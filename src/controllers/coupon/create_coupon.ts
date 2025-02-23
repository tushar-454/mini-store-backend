import { NextFunction, Request, Response } from 'express';
import { createCouponService } from '../../services/coupon/create_coupon';
import { CreateCouponInput } from '../../validation/coupon/create_coupon';

const createCoupon = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { code, type, discount, quantity, minprice, startAt, expireAt } = req.body as CreateCouponInput;
    const coupon = await createCouponService({ code, type, discount, quantity, minprice, startAt, expireAt });
    res.status(201).json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

export { createCoupon };
