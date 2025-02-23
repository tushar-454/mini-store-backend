import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import formatZodErrors from '../../utils/formatZodError';

const createCouponValidationSchema = z.object({
  code: z.string({ message: 'Coupon code is Required' }),
  type: z.enum(['flat', 'percentage'], { message: 'Coupon type is Required [flat / percentage]' }),
  discount: z.number({ message: 'Coupon discount is Required as number' }).positive({ message: 'Coupon discount must be greater than 0' }),
  quantity: z.number({ message: 'Coupon quantity is Required as number' }).nonnegative({ message: 'Coupon quantity must be greater than 0' }).optional(),
  minprice: z.number({ message: 'Coupon minprice is Required as number' }).nonnegative({ message: 'Coupon minprice must be greater than 0' }).optional(),
  startAt: z.string({ message: 'StartAt is Required as ISO String' }).optional(),
  expireAt: z
    .string({ message: 'ExpireAt is Required as IOS String' })
    .refine(
      (date) => {
        const expireAtDate = new Date(date).getTime();
        const currentDate = new Date().getTime();
        return currentDate < expireAtDate;
      },
      {
        message: 'ExpireAt must be greater than current date',
      }
    )
    .optional(),
});

const createCouponValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = createCouponValidationSchema.parse(req.body);
    next();
  } catch (error) {
    const result = createCouponValidationSchema.safeParse(req.body);
    res.status(400).json({
      status: 400,
      errors: result.error ? formatZodErrors(result.error) : [],
    });
  }
};

export type CreateCouponInput = z.infer<typeof createCouponValidationSchema>;
export { createCouponValidation };
